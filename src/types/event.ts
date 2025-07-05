// src/types/event.ts
export interface Event {
  id: string;
  title: string;
  period: string;
  imageUrl: string;
  status: '진행중' | '종료';
  description?: string;
}

export interface EventCardProps {
  event: Event;
  onClick: (id: string) => void;
}
