import { useEffect, useState } from 'react';
import { Channel, Members } from 'pusher-js';
import { useActiveList } from '@/app/hooks/useActiveList';
import { pusherClient } from '../libs/pusher';

export const useActiveChannel = () => {
  const { add, remove, set } = useActiveList();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChannel;

    if (!channel) {
      channel = pusherClient.subscribe('presence-messenger');
      setActiveChannel(channel);
    }

    channel.bind('pusher:subscription_succeeded', (members: Members) => {
      const initialMembers: string[] = [];

      members.each((member: Record<string, any>) =>
        initialMembers.push(member.id)
      );

      set(initialMembers);
    });

    channel.bind('pusher:member_added', (member: Record<string, any>) => {
      add(member.id);
    });

    channel.bind('pusher:member_removed', (member: Record<string, any>) => {
      remove(member.id);
    });

    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe('presence-messenger');
        // pusherClient.unbind('pusher:sbscription_succeeded');
        // pusherClient.unbind('pusher:member_added');
        // pusherClient.unbind('pusher:member_removed');
        setActiveChannel(null);
      }
    };
  }, [activeChannel, add, remove, set]);
};
