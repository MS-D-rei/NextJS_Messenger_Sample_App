import DesktopSidebar from '@/app/components/sidebar/DesktopSidebar';

const UsersSidebar: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-full">
      <DesktopSidebar />
      <main className="h-full lg:pl-20">{children}</main>
    </div>
  );
};

export default UsersSidebar;
