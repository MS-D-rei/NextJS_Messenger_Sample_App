import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import { useConversation } from '@/app/hooks/useConversation';

export const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId, isOpen } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        icon: HiChat,
        isActive: pathname === '/conversations' || !!conversationId,
      },
      {
        label: 'Users',
        href: '/users',
        icon: HiUsers,
        isActive: pathname === '/users',
      },
      {
        label: 'Logout',
        href: '#',
        onClick: () => signOut({ callbackUrl: '/' }),
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};
