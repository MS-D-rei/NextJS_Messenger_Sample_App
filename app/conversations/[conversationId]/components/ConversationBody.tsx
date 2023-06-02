'use client';

import { useRef, useState } from 'react';
import { FullMessageType } from '@/app/types';
import { useConversation } from '@/app/hooks/useConversation';

interface ConversationBodyProps {
  initialMessages: FullMessageType[];
}

const ConversationBody: React.FC<ConversationBodyProps> = ({
  initialMessages,
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  return (
    <div className='flex-1 overflow-y-auto'>
      {/* {messages.map((message, index) => ( */}
      {/*   <MessageItem */}
      {/*     key={message.id} */}
      {/*     data={message} */}
      {/*     isLast={index === messages.length - 1} */}
      {/*   /> */}
      {/* ))} */}
      <div ref={bottomRef} className='pt-24' />
    </div>
  )

};

export default ConversationBody;
