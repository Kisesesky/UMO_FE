// components/custom-scrollbar/ModernScrollbar.tsx
import React, { ReactNode, useRef, useState } from "react";

interface ModernScrollbarProps {
  children: ReactNode;
  className?: string;
}

const ModernScrollbar: React.FC<ModernScrollbarProps> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  // 스크롤 감지 -> 바 페이드인
  const onScroll = () => {
    setShow(true);
    clearTimeout((ref.current as any)?._timer);
    (ref.current as any)._timer = setTimeout(() => setShow(false), 1200);
  };

  return (
    <div className={`relative h-full min-h-0 flex-1 ${className || ""}`}>
      <div
        ref={ref}
        onScroll={onScroll}
        className="h-full w-full min-h-0 flex-1 overflow-y-auto pr-2"
        style={{ scrollbarWidth: "none" }}>
        {children}
      </div>
      {/* 커스텀 스크롤바 (에어비앤비 스타일) */}
      <div className={`pointer-events-none absolute right-0 top-0 w-2 h-full transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"}`}>
        <div className="absolute w-full rounded-full"
             style={{
               height: "20%",
               top: "30%",
             }}/>
      </div>
      <style jsx>{`
        /* 기본 스크롤 제거 */
        .overflow-y-scroll::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default ModernScrollbar;
