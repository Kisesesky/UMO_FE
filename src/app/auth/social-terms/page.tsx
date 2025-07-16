// src/app/auth/social-terms/page.tsx
import { Suspense } from 'react';
import SocialTermsContent from './SocialTermsContent';

export default function SocialTermsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">로딩 중...</div>}>
      <SocialTermsContent />
    </Suspense>
  );
}
