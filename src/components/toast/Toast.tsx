// src/components/Toast.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import type { ToastProps } from '@/types/toast';

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <motion.div
      className={`fixed top-6 left-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 transform rounded-xl px-4 py-3 shadow-xl ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-center text-sm font-semibold">{message}</p>
    </motion.div>
  );
}
