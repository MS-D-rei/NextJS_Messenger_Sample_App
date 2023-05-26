import UsersSidebar from '@/app/components/sidebar/UsersSidebar';

function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    // @ts-expect-error Async Server Component
    <UsersSidebar>
      <div
        className="
        h-full 
        "
      >
        {children}
      </div>
    </UsersSidebar>
  );
}

export default UsersLayout;
