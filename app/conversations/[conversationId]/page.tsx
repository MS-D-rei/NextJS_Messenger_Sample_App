import { getConversationById } from '@/app/actions/getConversationById';
import { getMessages } from '@/app/actions/getMessages';
import EmptyState from '@/app/components/EmptyState';

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
        <div>conversation ${params.conversationId}</div>
        {/* <ConversationHeader /> */}
      </div>
    </div>
  );
};

export default ConversationPage;
