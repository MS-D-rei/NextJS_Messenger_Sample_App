import { useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { format } from 'date-fns';
import { FullConversationType } from '@/app/types';
import { useOtherUser } from '@/app/hooks/useOtherUser';
import Avatar from '@/app/components/Avatar';

interface ConversationItemProps {
  data: FullConversationType;
  isSelected: boolean;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  data,
  isSelected,
}) => {
  const router = useRouter();
  const session = useSession();

  const otherUser = useOtherUser(data);

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [router, data.id]);

  const lastMessage = useMemo(() => {
    const messages = data.messages;

    const lastMessage = messages[messages.length - 1];

    return lastMessage;
  }, [data.messages]);

  const currentUserEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeenLastMessage = useMemo(() => {
    const isNoMessages = !lastMessage;

    if (isNoMessages) {
      return false;
    }

    if (!currentUserEmail) {
      return false;
    }

    const seenArray = lastMessage.seen_by || [];

    return (
      seenArray.filter((user) => user.email === currentUserEmail).length !== 0
    );
  }, [lastMessage, currentUserEmail]);

  const lastMessageText = useMemo(() => {
    const isImageSent = !!lastMessage?.image;

    if (isImageSent) {
      return 'Sent an image';
    }

    const isTextSent = !!lastMessage?.text;

    if (isTextSent) {
      return lastMessage?.text;
    }

    return 'Start a conversation';
  }, [lastMessage?.text, lastMessage?.image]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
      relative
      flex
      w-full
      items-center
      rounded-lg
      transition
      hover:bg-neutral-100
      cursor-pointer
      space-x-3
      p-3
      `,
        isSelected ? 'bg-neutral-100' : 'bg-white'
      )}
    >
      <Avatar user={otherUser} />
      <div className="flex-1 min-w-0">
        <div className="focus:outline-none">
          <div
            className="
            flex
            justify-between
            items-center
            mb-1
          "
          >
            <p className="text-sm font-medium text-neutral-900 truncate">
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs font-light text-gray-400">
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p className={clsx(`
            text-sm
            truncate
          `,
          hasSeenLastMessage ? 'text-gray-500' : 'text-black font-medium')}>
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
