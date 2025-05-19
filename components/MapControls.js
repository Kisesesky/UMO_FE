'use client';
import React from 'react';
import { FaRedo, FaLocationArrow } from 'react-icons/fa';

export default function MapControls() {
  return (
    <div className="absolute bottom-32 right-4 z-10 flex flex-col gap-3">
      <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
        <FaRedo className="text-gray-500" />
      </button>
      <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
        <FaLocationArrow className="text-gray-500" />
      </button>
    </div>
  );
}
