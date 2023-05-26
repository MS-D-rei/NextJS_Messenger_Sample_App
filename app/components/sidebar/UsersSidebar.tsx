import DesktopSidebar from '@/app/components/sidebar/DesktopSidebar';
import MobileFooter from '@/app/components/sidebar/MobileFooter';

async function UsersSidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <DesktopSidebar />
      <main className="h-full lg:pl-20">{children}</main>
      <MobileFooter />
    </div>
  );
};

export default UsersSidebar;
