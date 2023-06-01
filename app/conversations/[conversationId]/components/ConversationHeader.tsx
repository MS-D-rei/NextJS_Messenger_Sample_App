'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2';
import { Conversation, User } from '@prisma/client';
import { useOtherUser } from '@/app/hooks/useOtherUser';
import Avatar from '@/app/components/Avatar';

interface ConversationHeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  conversation,
}) => {
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return 'Active now';
  }, [conversation.isGroup, conversation.users.length]);
  return (
    <div
      className="
      w-full
      flex
      items-center
      justify-between
      bg-white
      border-b-[1px]
      py-3
      px-4
      sm:px-4
      lg:px-6
      shadow-sm
      "
    >
      <div className="flex items-center gap-3">
        <Link
          href="/conversations"
          className="
          block
          text-sky-500
          hover:text-sky-600
          transition
          cursor-pointer
          lg:hidden
          "
        >
          <HiChevronLeft size={30} />
        </Link>
        <Avatar user={otherUser} />
        <div className="flex flex-col">
          <div>{conversation.name || otherUser.name}</div>
          <div className="text-sm font-light text-neutral-500">
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={30}
        onClick={() => console.log('clicked')}
        className="
        text-sky-500
        hover:text-sky-600
        transition
        cursor-pointer
        "
      />
    </div>
  );
};

export default ConversationHeader;
