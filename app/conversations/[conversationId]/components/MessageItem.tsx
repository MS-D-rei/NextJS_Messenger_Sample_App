'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { format } from 'date-fns';
import { FullMessageType } from '@/app/types';
import Avatar from '@/app/components/Avatar';
import ImageModal from './ImageModal';

interface MessageItemProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ data, isLast }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const session = useSession();

  const isOwn = session.data?.user?.email === data.sender.email;

  const seenBy = (data.seen_by || [])
    .filter((user) => user.email !== data.sender.email)
    .map((user) => user.name)
    .join(', ');

  const containerClass = clsx(
    `
    flex
    gap-3
    p-4
  `,
    isOwn && 'justify-end'
  );
  const avatarClass = clsx(isOwn && 'order-2');
  const bodyClass = clsx(
    `
    flex
    flex-col
    gap-2
  `,
    isOwn && 'items-end'
  );
  const messageClass = clsx(
    `
    text-sm
    w-fit
    overflow-hidden
  `,
    isOwn ? 'text-white bg-blue-500' : 'text-gray-800 bg-gray-200',
    data.image ? 'rounded-md p-0' : 'rounded-full px-3 py-2'
  );

  return (
    <div className={containerClass}>
      <div className={avatarClass}>
        <Avatar user={data.sender} />
      </div>
      <div className={bodyClass}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>
        <div className={messageClass}>
          <ImageModal
            src={data?.image}
            isOpen={isImageModalOpen}
            onClose={() => setIsImageModalOpen(false)}
          />
          {data.image ? (
            <Image
              onClick={() => setIsImageModalOpen(true)}
              src={data.image}
              alt="Image"
              height={288}
              width={288}
              className="
              object-cover
              transition
              translate
              cursor-pointer
              hover:scale-110
              "
            />
          ) : (
            <div>{data.text}</div>
          )}
        </div>
        {isLast && isOwn && seenBy.length > 0 && (
          <div
            className="
            text-xs
            font-light
            text-gray-500
            "
          >
            {`Seen by ${seenBy}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
