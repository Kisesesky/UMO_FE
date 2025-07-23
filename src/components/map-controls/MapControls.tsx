// src/components/MapControls.tsx
'use client';
import { FaLocationArrow, FaRedo } from 'react-icons/fa';

interface MapControlsProps {
  onRefresh: () => void;
  onCurrentLocation: () => void;
  isRefreshing: boolean; // 새로고침 애니메이션을 위한 props
}

export default function MapControls({ onRefresh, onCurrentLocation, isRefreshing }: MapControlsProps) {
  return (
    
    <div className="flex flex-col gap-3"> {/* 변경 */}
      <button 
        className="map-control-button bg-white dark:bg-gray-800 shadow-md rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" // globals.css에서 스타일링
        onClick={onRefresh}
      >
        <div className={isRefreshing ? 'refresh-spin' : ''}>
          <FaRedo size={20} /> {/* 아이콘 크기 조정 */}
        </div>
      </button>
      <button 
        className="map-control-button bg-white dark:bg-gray-800 shadow-md rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" // globals.css에서 스타일링
        onClick={onCurrentLocation}
      >
        <FaLocationArrow size={20} /> {/* 아이콘 크기 조정 */}
      </button>
    </div>
  );
}