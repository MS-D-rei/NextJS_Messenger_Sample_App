import { useMemo, Fragment, useState } from 'react';
import { format } from 'date-fns';
import { Conversation, User } from '@prisma/client';
import { Dialog, Transition } from '@headlessui/react';
import { useOtherUser } from '@/app/hooks/useOtherUser';
import { IoClose, IoTrash } from 'react-icons/io5';
import Avatar from '@/app/components/Avatar';
import Modal from '@/app/components/Modal';

interface ProfileDrawerProps {
  data: Conversation & {
    users: User[];
  };
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  const otherUser = useOtherUser(data);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), 'PP');
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return 'Active';
  }, [data.isGroup, data.users.length]);

  return (
    <>
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
      >
        <div className="bg-white p-5">Hello Modal</div>
      </Modal>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          {/* gray schreen */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          {/* drawer */}
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="fixed flex max-w-full inset-y-0 right-0 pl-10 pointer-events-none">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-100"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-100"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
                    <div className="h-full flex flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      {/* close button */}
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="flex items-center h-7 ml-3">
                            <button
                              onClick={onClose}
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500
                              focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                            >
                              <span className="sr-only">Close panel</span>
                              <IoClose size={24} aria-hidden={true} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative flex-1 mt-6 px-4 sm:px-6">
                        {/* Avatar and Trashbox button */}
                        <div className="flex flex-col items-center">
                          <div className="mb-2">
                            <Avatar user={otherUser} />
                          </div>
                          <div>{title}</div>
                          <div className="text-sm text-gray-500">
                            {statusText}
                          </div>
                          <div className="flex gap-10 my-8">
                            <div onClick={() => setIsConfirmModalOpen(true)} className='flex flex-col items-center gap-3'>
                              <div className="flex items-center justify-center flex-col bg-neutral-100 rounded-full h-10 w-10">
                                <IoTrash size={20} />
                              </div>
                              <div className="text-sm font-light text-neutral-600">
                                Delete
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* other users profile info */}
                        <div className="w-full pt-5 pb-5 sm:pt-0 sm:px-0">
                          <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                            {!data.isGroup && (
                              <div>
                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                  Email
                                </dt>
                                <dd className="text-sm text-gray-900 mt-1 sm:col-span-2">
                                  {otherUser.email}
                                </dd>
                              </div>
                            )}
                            {!data.isGroup && (
                              <>
                                <hr />
                                <div>
                                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                    Joined
                                  </dt>
                                  <dd className="text-sm text-gray-900 mt-1 sm:col-span-2">
                                    <time dateTime={joinedDate}>
                                      {joinedDate}
                                    </time>
                                  </dd>
                                </div>
                              </>
                            )}
                          </dl>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ProfileDrawer;
