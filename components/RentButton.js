'use client';
import React from 'react';

export default function RentButton() {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
      <button 
        className="w-full bg-black text-white py-4 rounded-lg font-semibold text-lg"
        onClick={() => console.log('rent clicked')}
      >
        대여하기
      </button>
    </div>
  );
}
