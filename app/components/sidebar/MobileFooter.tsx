'use client';

import { useConversation } from '@/app/hooks/useConversation';
import { useRoutes } from '@/app/hooks/useRoutes';
import MobileFooterItem from '@/app/components/sidebar/MobileFooterItem';

function MobileFooter() {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div
      className="
      lg:hidden
      fixed
      flex
      w-full
      bottom-0
      bg-white
      z-40
      border-t-[1px]
      "
    >
      {routes.map((route) => (
        <MobileFooterItem
          key={route.label}
          label={route.label}
          href={route.href}
          icon={route.icon}
          isActive={route.isActive}
          onClick={route.onClick}
        />
      ))}
    </div>
  );
}

export default MobileFooter;
