'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { FaBell, FaBars } from 'react-icons/fa';
import { MdRefresh, MdLocationOn } from 'react-icons/md';
import Drawer from '@/components/Drawer';

const KakaoMap = dynamic(() => import('@/components/KakaoMap'), { ssr: false });

export default function RentPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="app-container">
      <div className="map-container">
        <KakaoMap />
      </div>

      <div className="ui-container">
        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="어디로 가시나요?"
              className="search-input"
            />
            <button className="icon-button">
              <FaBell size={20} color="#666" />
            </button>
          </div>
          <button 
            className="icon-button"
            onClick={() => setIsDrawerOpen(true)}
          >
            <FaBars size={20} color="#666" />
          </button>
        </div>

        <div className="controls-container">
          <button className="icon-button">
            <MdRefresh size={24} color="#666" />
          </button>
          <button className="icon-button">
            <MdLocationOn size={24} color="#666" />
          </button>
        </div>

        <div className="rent-button-container">
          <button className="rent-button">
            대여하기
          </button>
        </div>
      </div>

      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </div>
  );
}
