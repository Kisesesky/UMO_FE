// src/components/TermsModal.tsx
'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
  title: string;
  content: string; // 약관 내용 (HTML 문자열 또는 일반 텍스트)
}

export default function TermsModal({ isOpen, onClose, onAgree, title, content }: TermsModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [isConfirmButtonEnabled, setIsConfirmButtonEnabled] = useState(false);

  // 모달 열릴 때 스크롤 상태 초기화
  useEffect(() => {
    if (isOpen) {
      setIsScrolledToBottom(false);
      setIsConfirmButtonEnabled(false);
      // 내용이 짧아서 스크롤이 없는 경우 바로 활성화
      if (contentRef.current) {
        const { scrollHeight, clientHeight } = contentRef.current;
        if (scrollHeight <= clientHeight) {
          setIsScrolledToBottom(true);
          setIsConfirmButtonEnabled(true);
        }
      }
    }
  }, [isOpen]);

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = contentRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 4) { // -4로 완화
        setIsConfirmButtonEnabled(true);
      }
    }
  };

  // 모달이 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      setIsConfirmButtonEnabled(false);
      setTimeout(() => {
        if (contentRef.current) {
          const { scrollHeight, clientHeight } = contentRef.current;
          if (scrollHeight <= clientHeight + 1) {
            setIsConfirmButtonEnabled(true);
          }
        }
      }, 50);
    }
  }, [isOpen]);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md dark:bg-gray-800 flex flex-col h-[80vh] overflow-hidden">
        {/* 모달 헤더 */}
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Image
              src="/assets/character/umo-face.png"
              alt="우모 캐릭터"
              width={36}
              height={36}
              className="rounded-full"
              style={{ minWidth: 36, minHeight: 36 }}
            />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600 ml-2"
            aria-label="모달 닫기"
          >
            <FaTimes size={18} />
          </button>
        </header>

        {/* 모달 내용 */}
        <div 
          ref={contentRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-4 text-gray-700 dark:text-gray-100 leading-relaxed text-sm"
          dangerouslySetInnerHTML={{ __html: content }} // HTML 문자열 렌더링
        />

        {/* 모달 푸터 (동의 버튼) */}
        <footer className="p-4 border-t border-gray-200 shrink-0">
          <button
            onClick={onAgree}
            disabled={!isConfirmButtonEnabled}
            className={`w-full py-3 rounded-lg font-medium text-white transition-colors ${
              isConfirmButtonEnabled
                ? 'bg-primary-600 hover:bg-primary-700 active:bg-primary-800 shadow-button'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            약관 동의
          </button>
        </footer>
      </div>
    </div>
  );
}