'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { MdOutlineGroupAdd } from 'react-icons/md';
import { find } from 'lodash';
import { User } from '@prisma/client';
import { FullConversationType } from '@/app/types';
import { useConversation } from '@/app/hooks/useConversation';
import ConversationItem from '@/app/conversations/components/ConversationItem';
import GroupChatModal from '@/app/conversations/components/GroupChatModal';
import { pusherClient } from '@/app/libs/pusher';

interface ConversationListProps {
  initialConversationData: FullConversationType[];
  users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialConversationData,
  users,
}) => {
  const [conversationData, setConversationData] = useState(
    initialConversationData
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const session = useSession();

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  // useEffect to update conversation with pusher event

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newConversationHandler = (newConversation: FullConversationType) => {
      setConversationData((currentConversations) => {
        const isNewConversationAlreadyExist = find(currentConversations, {
          id: newConversation.id,
        });

        if (isNewConversationAlreadyExist) {
          return currentConversations;
        }
        return [newConversation, ...currentConversations];
      });
    };

    const updateConversationHandler = (
      updatedConversation: FullConversationType
    ) => {
      setConversationData((currentConversations) => {
        return currentConversations.map((currentConvresation) => {
          if (currentConvresation.id === updatedConversation.id) {
            return {
              ...currentConvresation,
              messages: updatedConversation.messages,
            };
          }

          return currentConvresation;
        });
      });
    };

    pusherClient.bind('conversation:new', newConversationHandler);
    pusherClient.bind('conversation:update', updateConversationHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind('conversation:new', newConversationHandler);
      pusherClient.unbind('conversation:update', newConversationHandler);
    };
  }, [pusherKey]);

  return (
    <>
      <GroupChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={users}
      />
      <aside
        className={clsx(
          `fixed inset-y-0 pb-20 lg:block lg:pb-0 lg:left-20 lg:w-80 overflow-y-auto border-r border-gray-200`,
          isOpen ? 'hidden' : 'block w-full left-0'
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Messages</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="
              rounded-full
              p-2
              bg-gray-100
              text-gray-600
              cursor-pointer
              hover:opacity-75
              transition
              "
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {conversationData.map((item) => (
            <ConversationItem
              key={item.id}
              conversationData={item}
              isSelected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
