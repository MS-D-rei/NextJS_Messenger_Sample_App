import clsx from 'clsx';
import Link from 'next/link';
import { IconType } from 'react-icons';

interface DesktopSidebarItemProps {
  label: string;
  href: string;
  icon: IconType;
  isActive?: boolean;
  onClick?: () => void;
}

const DesktopSidebarItem: React.FC<DesktopSidebarItemProps> = ({
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
    <li key={label} onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `
          flex
          group
          rounded-md
          gap-x-3
          text-sm
          leading-6
          font-semibold
          text-gray-500
          p-3
          hover:text-black
          hover:bg-gray-100
          `,
          isActive && `bg-gray-100 text-black`
        )}
      >
        <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopSidebarItem;
