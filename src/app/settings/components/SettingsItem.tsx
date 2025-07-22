// src/app/settings/components/SettingsItem.tsx
import { ReactNode } from 'react';

interface SettingsItemProps {
  icon? : ReactNode;
  label: string;
  onClick?: () => void;
  children?: ReactNode;
  isButton?: boolean;
  isDestructive?: boolean;
}

export const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  label,
  onClick,
  children,
  isButton = true,
  isDestructive = false,
}) => {
  const content = (
    <div className="w-full text-left p-4 flex items-center justify-between">
      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
        {icon && <span className="text-gray-500 dark:text-gray-400">{icon}</span>}
          <span>{label}</span>
      </div>
      {children}
    </div>
  );

  return (
    <li className="border-b border-gray-100 last:border-b-0 dark:border-gray-700">
      {isButton ? (
        <button
          className={`w-full text-left ${isDestructive ? 'text-red-500 dark:text-red-400 font-medium' : ''}`}
          onClick={onClick}
        >
        {content}
        </button>
      ) : (
        content
      )}
    </li>
  );
};
