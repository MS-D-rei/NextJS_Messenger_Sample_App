'use client';

import { useState } from 'react';
import { useRoutes } from '@/app/hooks/useRoutes';
import { User } from '@prisma/client';
import DesktopSidebarItem from '@/app/components/sidebar/DesktopSidebarItem';
import Avatar from '@/app/components/Avatar';
import SettingModal from '@/app/components/sidebar/SettingModal';

interface DesktopSidebarProps {
  currentUser: User;
}

function DesktopSidebar({ currentUser }: DesktopSidebarProps) {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  // console.log(currentUser);

  return (
    <>
      <SettingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currentUser={currentUser}
      />
      <div
        className="
      hidden
      justify-between
      lg:flex
      lg:flex-col
      lg:fixed
      lg:inset-y-0
      lg:left-0
      lg:z-40
      lg:w-20
      lg:overflow-auto
      lg:bg-white
      lg:border-r-[1px]
      lg:pb-4
      xl:px-6
      "
      >
        <nav
          className="
        flex
        flex-col
        justify-between
        mt-4
        "
        >
          <ul
            role="list"
            className="
          flex
          flex-col
          items-center
          space-y-4
          "
          >
            {routes.map((route) => (
              <DesktopSidebarItem
                key={route.label}
                href={route.href}
                label={route.label}
                icon={route.icon}
                isActive={route.isActive}
                onClick={route.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="flex flex-col items-center justify-center mt-4">
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer transition hover:opacity-75"
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
}

export default DesktopSidebar;
