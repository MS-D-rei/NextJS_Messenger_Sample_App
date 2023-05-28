import { User } from '@prisma/client';
import UserListItem from '@/app/users/components/UserListItem';

interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
    <aside
      className="
      fixed
      block
      w-full
      inset-y-0
      left-0
      pb-20
      overflow-y-auto
      border-r
      border-gray-200
      lg:block
      lg:pb-0
      lg:left-20
      lg:w-80
      "
    >
      <div className="px-5">
        <div className="flex-col">
          <div
            className="
            text-2xl
            font-bold
            text-neutral-800
            py-4
            "
          >
            People
          </div>
        </div>
        {items.map((item) => (
          <UserListItem key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
