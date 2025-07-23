//src/components/notice/page.tsx
'use client';

import { NoticeCardProps } from '@/types/notice';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function NoticeCard({ notice, isExpanded, onToggle }: NoticeCardProps) {
  const handleCardClick = () => {
    onToggle(notice.id);
  };

  // 툴팁 내용 설정
  const tooltipContent =
    notice.description?.trim() ||
    (notice.content ? notice.content.substring(0, 50) + '...' : ''); // fallback 안전 처리

    const renderButtonContent = () => (
      <>
        <div className="notice-item-header flex justify-between items-center bg-white dark:bg-gray-800">
          <div className="notice-item-title-group flex items-center gap-2 text-gray-900 dark:text-gray-100">
            {notice.isNew && <span className="notice-item-badge">NEW</span>}
            <h4 className="notice-item-title text-single-line text-gray-900 dark:text-gray-100">{notice.title}</h4>
          </div>
  
          <div className="notice-item-meta flex items-center gap-2 text-sm text-gray-500 dark:text-gray-100">
            <span className="notice-item-date">{notice.date}</span>
            {isExpanded ? (
              <FaChevronUp className="notice-item-toggle-icon text-gray-700 dark:text-gray-300" />
            ) : (
              <FaChevronDown className="notice-item-toggle-icon text-gray-700 dark:text-gray-300" />
            )}
          </div>
        </div>
  
        {isExpanded && notice.content && (
          <div className="notice-item-content mt-3 text-gray-700 dark:text-gray-300 text-sm">
            {notice.content.split('\n').map((line, index) => (
              <p key={index} className="mb-2 whitespace-pre-line">{line}</p>
            ))}
          </div>
        )}
      </>
    );
  
    return (
      <div className="card-item bg-white dark:bg-gray-800">
        {/* 툴팁 타겟은 닫힌 상태일 때만 활성화 */}
        {!isExpanded ? (
          <div
            data-tooltip-id="notice-tooltip"
            data-tooltip-content={tooltipContent}
            className="w-full"
          >
            <button
              className="notice-item-button w-full text-left"
              onClick={handleCardClick}
            >
              {renderButtonContent()}
            </button>
          </div>
        ) : (
          <div className="w-full">
            <button
              className="notice-item-button w-full text-left"
              onClick={handleCardClick}
            >
              {renderButtonContent()}
            </button>
          </div>
        )}
      </div>
    );
  }
  