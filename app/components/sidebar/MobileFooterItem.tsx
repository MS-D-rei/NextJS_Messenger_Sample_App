import clsx from 'clsx';
import Link from 'next/link';
import { IconType } from 'react-icons';

interface MobileFooterItemProps {
  label: string;
  href: string;
  icon: IconType;
  isActive?: boolean;
  onClick?: () => void;
}

const MobileFooterItem: React.FC<MobileFooterItemProps> = ({
  label,
  href,
  icon: Icon,
  isActive,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        `
        flex
        group
        w-full
        items-center
        justify-center
        text-sm
        leading-6
        font-semibold
        text-gray-500
        gap-x-3
        p-4
        hover:text-black
        hover:bg-gray-100
        `,
        isActive && `bg-gray-100 text-black`
      )}
    >
      <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
      <span className="">{label}</span>
    </Link>
  );
};

export default MobileFooterItem;
