import { User } from '@prisma/client';
import Avatar from '@/app/components/Avatar';

interface UserListItemProps {
  data: User;
}

const UserListItem: React.FC<UserListItemProps> = ({ data }) => {
  return (
    <div
      className="
      relative
      w-full
      flex
      items-center
      space-x-3
      bg-white
      p-3
      hover:bg-neutral-100
      rounded-lg
      transition
      cursor-pointer
      "
    >
      <Avatar user={data} />

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium text-gray-900">{data.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
