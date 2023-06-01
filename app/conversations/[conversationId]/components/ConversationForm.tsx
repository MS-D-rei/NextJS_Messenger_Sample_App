'use client';

import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import { useConversation } from '@/app/hooks/useConversation';
import MessageInput from '@/app/conversations/[conversationId]/components/MessageInput';
import { CldUploadButton } from 'next-cloudinary';
import { File } from 'buffer';

const ConversationForm = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  });

  const submitHandler: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    setValue('message', '', { shouldValidate: true });

    axios.post('/api/messages', {
      ...data,
      conversationId
    })
  };

  const handleUpload = (file: any) => {
    axios.post('/api/messages', {
      image: file?.info?.secure_url,
      conversationId,
    })
  }

  return (
    <div
      className="
      flex
      w-full
      items-center
      bg-white
      px-4
      py-4
      gap-2
      lg:gap-4
      border-t
      "
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="
        flex
        w-full
        items-center
        gap-2
        lg:gap-4
        "
      >
        <MessageInput
          id="message"
          type="text"
          placeholder="Type a message"
          register={register}
          errors={errors}
        />
        <button
          type="submit"
          className="
          rounded-full
          text-white
          bg-sky-500
          hover:bg-sky-600
          p-2
          transition
          cursor-pointer
          "
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default ConversationForm;
