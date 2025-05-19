'use client';
import React from 'react';
import { FaBell, FaBars } from 'react-icons/fa';

export default function SearchBar() {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center gap-3">
      <div className="flex-1 bg-white rounded-full shadow-lg flex items-center px-4 py-2">
        <input
          type="text"
          placeholder="어디로 가시나요?"
          className="flex-1 outline-none"
        />
        <button className="p-2">
          <FaBell className="text-gray-500" />
        </button>
      </div>
      <button className="p-3 bg-white rounded-full shadow-lg">
        <FaBars className="text-gray-500" />
      </button>
    </div>
  );
}
