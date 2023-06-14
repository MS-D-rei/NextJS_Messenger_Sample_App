'use client';

import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FullMessageType } from '@/app/types';
import { useConversation } from '@/app/hooks/useConversation';
import MessageItem from '@/app/conversations/[conversationId]/components/MessageItem';
import { pusherClient } from '@/app/libs/pusher';
import { find } from 'lodash';

interface ConversationBodyProps {
  initialMessages: FullMessageType[];
}

const ConversationBody: React.FC<ConversationBodyProps> = ({
  initialMessages = [],
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (newMessage: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((currentMessages) => {
        const isMessageExist = find(currentMessages, { id: newMessage.id });

        if (isMessageExist) {
          return currentMessages;
        }

        return [...currentMessages, newMessage];
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (updatedLastMessage: FullMessageType) => {
      setMessages((currentMessages) =>
        currentMessages.map((currentMessage) => {
          if (currentMessage.id === updatedLastMessage.id) {
            return updatedLastMessage;
          }

          return currentMessage;
        })
      );
    };

    pusherClient.bind('messages:new', messageHandler);
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new');
      pusherClient.unbind('message:update');
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, index) => (
        <MessageItem
          key={message.id}
          data={message}
          isLast={index === messages.length - 1}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default ConversationBody;
