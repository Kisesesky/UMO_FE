// src/types/admin/admin-logs.ts
export interface AdminLog {
  id: number;
  admin: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  action: string;
  targetType: string;
  targetId?: number;
  message?: string;
  createdAt: string;
}
