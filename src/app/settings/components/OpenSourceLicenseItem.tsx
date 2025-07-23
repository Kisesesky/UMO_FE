// src/app/settings/components/OpenSourceLicenseItem.tsx
import { OpenSourceLicense } from '../data/openSourceLicenses';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function OpenSourceLicenseItem({
  name,
  description,
  license,
  url,
}: OpenSourceLicense) {
  return (
    <div className="p-4 border border-border bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-1 text-gray-950 dark:text-white">
        <h2 className="text-lg font-medium">{name}</h2>
        <span className="text-xs bg-muted px-2 py-0.5 rounded-md font-mono">
          {license}
        </span>
      </div>
      <p className="text-sm text-muted-foreground text-gray-800 dark:text-white">{description}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center mt-2 text-blue-500 hover:underline text-sm"
      >
        GitHub <FaExternalLinkAlt className="ml-1 text-xs" />
      </a>
    </div>
  );
}
