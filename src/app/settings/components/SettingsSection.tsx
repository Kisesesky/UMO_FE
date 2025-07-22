// frontend/src/app/settings/components/SettingsSection.tsx
import { ReactNode } from 'react';

interface SettingsSectionProps {
  title: string;
  children: ReactNode
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-4">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
      </div>
      <ul>
        {children}
      </ul>
    </div>
  );
};
