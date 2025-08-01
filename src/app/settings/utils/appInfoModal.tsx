// src/app/settings/utils/appInfoModal.tsx
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaInfoCircle } from "react-icons/fa";

type Props = { onClose: () => void };

export function AppInfoModal({ onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKeydown);
    const origin = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeydown);
      document.body.style.overflow = origin;
    };
  }, [onClose]);

  const handleOpenLicenseModal = () => {
    onClose();
    router.push('/settings/open-source');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={onClose}
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        className="relative max-w-xs w-full rounded-xl bg-white dark:bg-gray-800 p-8 shadow-xl animate-popin"
        onClick={e => e.stopPropagation()} // 모달 내부 클릭 시 상위 닫힘 이벤트 중단
      >
        <button
          onClick={onClose}
          aria-label="닫기"
          type="button"
          className="absolute right-4 top-4 rounded hover:text-gray-900 dark:hover:text-gray-100 text-gray-400"
        >
          ✕
        </button>
        <h2 className="mb-4 flex items-center text-lg font-bold text-gray-800 dark:text-gray-100">
          <FaInfoCircle className="mr-2" /> 앱 정보
        </h2>
        <dl className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <div>
            <dt className="text-xs text-gray-500">버전</dt>
            <dd>1.0.0</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">제작사</dt>
            <dd>UMO Company</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">고객센터</dt>
            <dd>support@umo.site</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">서비스 이용약관</dt>
            <dd>
              <a href="/terms" className="text-blue-600 hover:underline">약관 보기</a>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">개인정보처리방침</dt>
            <dd>
              <a href="/privacy" className="text-blue-600 hover:underline">처리방침 보기</a>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">오픈소스 라이선스</dt>
            <dd>
              <button onClick={handleOpenLicenseModal} className="text-blue-600 hover:underline">
                오픈소스 라이선스 보기
              </button>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
