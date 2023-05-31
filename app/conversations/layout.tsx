import UsersSidebar from '@/app/components/sidebar/UsersSidebar';
import { getConversations } from '@/app/actions/getConversations';
import ConversationList from '@/app/conversations/components/ConversationList';

interface ConversationsLayoutProps {
  children: React.ReactNode;
}

async function ConversationsLayout({ children }: ConversationsLayoutProps) {
  const conversations = await getConversations();
  return (
    // @ts-expect-error server component
    <UsersSidebar>
      <div className="h-full">
        <ConversationList initialConversationData={conversations} />
        {children}
      </div>
    </UsersSidebar>
  );
}

export default ConversationsLayout;
