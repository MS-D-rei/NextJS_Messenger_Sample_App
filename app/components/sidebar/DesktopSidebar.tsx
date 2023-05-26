'use client';

import { useState } from "react";
import { useRoutes } from "@/app/hooks/useRoutes";
import DesktopSidebarItem from "@/app/components/sidebar/DesktopSidebarItem";

function DesktopSidebar() {
  const routes = useRoutes();
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="
      hidden
      lg:flex
      lg:flex-col
      justyfy-between
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
      ">
      <nav className="
        flex
        flex-col
        justify-between
        mt-4
        ">
        <ul
          role='list'
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
              icon ={route.icon}
              active={route.active}
            />
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default DesktopSidebar;
