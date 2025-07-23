// src/app/settings/components/OpenSourceLicenseItem.tsx
import React from 'react';
import { OpenSourceLicense } from '../data/openSourceLicenses';

export default function OpenSourceLicenseItem(props: OpenSourceLicense) {
  const { name, description, license, url } = props;

  return (
    <div className="border-b py-3">
      <div className="text-lg font-semibold">{name}</div>
      <div className="text-sm text-gray-500">{description}</div>
      <div className="text-sm">
        <span className="font-medium">License:</span> {license}
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 text-sm hover:underline"
      >
        GitHub 링크
      </a>
    </div>
  );
}
