'use client';

import { useCallback, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FiAlertTriangle } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { useConversation } from '@/app/hooks/useConversation';
import Modal from '@/app/components/Modal';
import { Dialog } from '@headlessui/react';
import Button from '@/app/components/Button';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = useCallback(() => {
    setIsLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push('/conversations');
        router.refresh();
      })
      .catch(() => toast.error('Something went wrong. Please try again.'));

    setIsLoading(false);
  }, [conversationId, onClose, router]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div
          className="flex items-center justify-center h-12 w-12 flex-shrink-0 mx-auto
          rounded-full bg-red-100 sm:h-10 sm:w-10 sm:mx-auto"
        >
          <FiAlertTriangle
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="text-center mt-3 sm:text-left sm:ml-4 sm:mt-0">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete conversation
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this conversation? This action
              cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:flex sm:flex-row-reverse sm:mt-4">
        <Button
          type="button"
          danger
          disabled={isLoading}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button type="button" secondary disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
