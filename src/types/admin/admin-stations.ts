// src/types/admin/admin-stations.ts
export interface AdminStation {
  id: number;
  name: string;
  address?: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
  umbrellaCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStationDto {
  name: string;
  address?: string;
  latitude: number;
  longitude: number;
}

export type UpdateStationDto = Partial<CreateStationDto>;
