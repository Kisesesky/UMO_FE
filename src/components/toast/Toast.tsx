// src/components/Toast.tsx
'use client';

import React from 'react';
import type { ToastProps } from '@/types/toast';

export default function Toast({ message, visible }: ToastProps) {
  return (
    <div
      className={`
        fixed top-8 left-1/2 -translate-x-1/2 z-[9999]
        min-w-[260px] max-w-[90vw]
        bg-slate-900/95 text-white px-7 py-3 rounded-lg shadow-lg text-center font-medium
        transition-opacity duration-400
        pointer-events-none
        ${visible ? 'opacity-100' : 'opacity-0'}
      `}
      aria-live="polite"
    >
      {message}
    </div>
  );
}
