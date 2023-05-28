import DesktopSidebar from '@/app/components/sidebar/DesktopSidebar';
import MobileFooter from '@/app/components/sidebar/MobileFooter';
import { getCurrentUser } from '@/app/actions/getCurrentUser';

async function UsersSidebar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <main className="h-full lg:pl-20">{children}</main>
      <MobileFooter />
    </div>
  );
};

export default UsersSidebar;
