import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const LoadingModal = () => {
  <Transition.Root show={true} as={Fragment}>
    <Dialog as="div" onClose={() => { }} className="relative z-50">
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-100 bg-opacity-50 transition-opacity" />
      </Transition.Child>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center text-center min-h-full p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel>{/* <ClipLoader /> */}</Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>;
};

export default LoadingModal;
