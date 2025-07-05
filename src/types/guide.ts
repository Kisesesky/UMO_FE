// src/types/guide.ts
export interface GuideItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  steps: string[];
  summary: string;
}