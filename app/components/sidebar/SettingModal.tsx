'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User } from 'next-auth';
import { CldUploadButton } from 'next-cloudinary';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import Modal from '@/app/components/Modal';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';

interface SettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
}

const SettingModal: React.FC<SettingModalProps> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch('image');

  const handleUpload = (result: any) => {
    setValue('image', result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const submitHandler: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/setting', data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error('Something went wrong!'));

    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit your public infomation.
            </p>

            <div className="flex flex-col mt-10 gap-y-8">
              <Input
                id="name"
                label="Name"
                type="text"
                register={register}
                errors={errors}
                disabled={isLoading}
                required={true}
              />
              <div>
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div>
                  <Image
                    width={48}
                    height={48}
                    src={
                      image || currentUser?.image || '/images/placeholder.jpg'
                    }
                    alt="Avatar"
                    className="rounded-full"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 3 }}
                    onUpload={handleUpload}
                    uploadPreset={
                      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                    }
                  >
                    <Button type="button" secondary disabled={isLoading}>
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Button
            type="button"
            secondary
            disabled={isLoading}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SettingModal;
