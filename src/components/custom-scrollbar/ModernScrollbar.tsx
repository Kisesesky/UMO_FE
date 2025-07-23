// components/custom-scrollbar/ModernScrollbar.tsx
import React, { ReactNode, useEffect, useRef, useState } from "react";

interface ModernScrollbarProps {
  children: ReactNode;
  className?: string;
}

const ModernScrollbar: React.FC<ModernScrollbarProps> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [thumbHeight, setThumbHeight] = useState(20); // 퍼센트 X, px 기준
  const [thumbTop, setThumbTop] = useState(0);

  const updateThumb = () => {
    const el = ref.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;

    const heightRatio = clientHeight / scrollHeight;
    const thumbHeight = Math.max(clientHeight * heightRatio, 30); // 최소 높이 30px
    const thumbTop = (scrollTop / scrollHeight) * clientHeight;

    setThumbHeight(thumbHeight);
    setThumbTop(thumbTop);
  };

  const onScroll = () => {
    updateThumb();
    setShow(true);
    clearTimeout((ref.current as any)?._timer);
    (ref.current as any)._timer = setTimeout(() => setShow(false), 1200);
  };

  // 초기 렌더 시 thumb 계산
  useEffect(() => {
    updateThumb();

    const handleResize = () => updateThumb();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`relative h-full min-h-0 flex-1 ${className || ""}`}>
      <div
        ref={ref}
        onScroll={onScroll}
        className="h-full w-full min-h-0 flex-1 overflow-y-auto pr-2 no-scrollbar"
      >
        {children}
      </div>

      {/* 커스텀 스크롤바 */}
      <div
        className={`pointer-events-none absolute right-0 top-0 w-2 h-full transition-opacity duration-300 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="absolute w-full rounded-full opacity-50"
          style={{
            height: `${thumbHeight}px`,
            top: `${thumbTop}px`,
          }}
        />
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ModernScrollbar;
