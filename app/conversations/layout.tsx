import UsersSidebar from '@/app/components/sidebar/UsersSidebar';
import { getConversations } from '@/app/actions/getConversations';
import ConversationList from '@/app/conversations/components/ConversationList';
import { getUsers } from '@/app/actions/getUsers';

interface ConversationsLayoutProps {
  children: React.ReactNode;
}

async function ConversationsLayout({ children }: ConversationsLayoutProps) {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    // @ts-expect-error server component
    <UsersSidebar>
      <div className="h-full">
        <ConversationList
          initialConversationData={conversations}
          users={users}
        />
        {children}
      </div>
    </UsersSidebar>
  );
}

export default ConversationsLayout;
