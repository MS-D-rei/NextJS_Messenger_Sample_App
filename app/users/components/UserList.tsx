import { User } from '@prisma/client';

interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
    <aside>
      <div>
        <div>
          <div>
            People
          </div>
        </div>
        {/* {items.map((item) => ( */}
        {/*   <UserListItem key={item.id} data={item} /> */}
        {/* ))} */}
      </div>
    </aside>
  );
};

export default UserList;
