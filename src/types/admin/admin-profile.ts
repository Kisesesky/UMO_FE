// src/types/admin/admin-profile.ts
export interface AdminProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateAdminProfileDto {
  name?: string;
  email?: string;
}

export interface ChangeAdminPasswordDto {
  currentPassword: string;
  newPassword: string;
}
