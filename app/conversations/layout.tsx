import UsersSidebar from '@/app/components/sidebar/UsersSidebar';
import { getConversations } from '@/app/actions/getConversations';

interface ConversationsLayoutProps {
  children: React.ReactNode;
}

async function ConversationsLayout({ children }: ConversationsLayoutProps) {
  const conversation = await getConversations();
  return (
    // @ts-expect-error server component
    <UsersSidebar>
      <div className="h-full">
        {/* <ConversationList data={conversation} /> */}
        {children}
      </div>
    </UsersSidebar>
  );
}

export default ConversationsLayout;
