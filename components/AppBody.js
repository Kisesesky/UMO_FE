'use client';
import { useState } from 'react';
import Drawer from './Drawer';

export default function AppBody({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="app-container">
      {children}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
}
