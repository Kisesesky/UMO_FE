// src/types/admin/admin-users.ts
export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UpdateAdminUserDto = Partial<Pick<AdminUser, 'name' | 'role' | 'isActive'>>;
