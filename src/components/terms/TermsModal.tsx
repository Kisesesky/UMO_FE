// src/components/TermsModal.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
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
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      // 스크롤이 끝까지 내려갔는지 확인 (오차 범위 1px)
      if (scrollHeight - scrollTop <= clientHeight + 1) {
        setIsScrolledToBottom(true);
        setIsConfirmButtonEnabled(true);
      } else {
        setIsScrolledToBottom(false);
      }
    }
  };

  // 모달이 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md flex flex-col h-[80vh] overflow-hidden">
        {/* 모달 헤더 */}
        <header className="flex justify-between items-center p-4 border-b border-gray-200 shrink-0">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600"
          >
            <FaTimes size={18} />
          </button>
        </header>

        {/* 모달 내용 */}
        <div 
          ref={contentRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-4 text-gray-700 leading-relaxed text-sm"
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