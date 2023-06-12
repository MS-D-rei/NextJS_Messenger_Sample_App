'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { User } from '@prisma/client';
import Modal from '@/app/components/Modal';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';

interface GroupChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({ isOpen, onClose }) => {

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: [],
    },
  });

  const members = watch('members');

  const submitHandler: SubmitHandler<FieldValues> = (data) => {

  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            {/* Form title and description */}
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Create a group chat
            </h2>
            <p className='text-sm leading-6 text-gray-600 mt-1'>
              Create a chat with more than 2 people.
            </p>

            {/* Group name and picking members */}
            <div className='flex flex-col gap-y-8 mt-10'>
              <Input
                label='Group name'
                id='name'
                type='text'
                required
                register={register}
                errors={errors}
                disabled={isLoading}
              />

            </div>

          </div>

        </div>

        {/* Cancel and create buttons */}
        <div className='flex items-center justify-end gap-x-6 mt-6'>
          <Button
            type='button'
            secondary
            disabled={isLoading}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            disabled={isLoading}
          >
            Create
          </Button>
        </div>

      </form>
    </Modal>
  );
};

export default GroupChatModal;
