import { getConversationById } from '@/app/actions/getConversationById';
import { getMessages } from '@/app/actions/getMessages';
import EmptyState from '@/app/components/EmptyState';
import ConversationHeader from '@/app/conversations/[conversationId]/components/ConversationHeader';
import ConversationBody from '@/app/conversations/[conversationId]/components/ConversationBody';
import ConversationForm from '@/app/conversations/[conversationId]/components/ConversationForm';

interface IParams {
  conversationId: string;
}

const ConversationPage = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="h-full lg:pl-80">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className='h-full lg:pl-80'>
      <div className='h-full flex flex-col'>
        <ConversationHeader conversation={conversation}  />
        <ConversationBody initialMessages={messages} />
        <ConversationForm />
      </div>
    </div>
  );
};

export default ConversationPage;
