import UsersSidebar from '@/app/components/sidebar/UsersSidebar';
import UserList from '@/app/users/components/UserList';
import { getUsers } from '@/app/actions/getUsers';

async function UsersLayout({ children }: { children: React.ReactNode }) {
  const users = await getUsers();
  return (
    // @ts-expect-error Async Server Component
    <UsersSidebar>
      <div
        className="
        h-full 
        "
      >
        <UserList items={users} />
        {children}
      </div>
    </UsersSidebar>
  );
}

export default UsersLayout;
