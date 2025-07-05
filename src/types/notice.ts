// src/types/notice.ts
export interface Notice {
  id: string;
  title: string;
  date: string;
  isNew: boolean;
  content?: string;
  description?: string;  // 툴팁용 간략 설명 필드
}

export interface NoticeCardProps {
  notice: Notice;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}
