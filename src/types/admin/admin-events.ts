// src/types/admin/admin-events.ts
export interface AdminEvent {
  id: number;
  title: string;
  content: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventDto {
  title: string;
  content: string;
  startDate?: string;
  endDate?: string;
}

export type UpdateEventDto = Partial<CreateEventDto>;
