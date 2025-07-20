// src/types/admin/admin-umbrellas.ts
export interface AdminUmbrella {
  id: number;
  code: string;
  status: 'AVAILABLE' | 'RENTED' | 'LOST' | 'INACTIVE';
  station?: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateUmbrellaDto {
  code: string;
  stationId: number;
}

export type UpdateUmbrellaDto = Partial<CreateUmbrellaDto>;

export interface UmbrellaChangeStatusDto {
  status: 'AVAILABLE' | 'RENTED' | 'LOST' | 'INACTIVE';
}

export interface MoveStationDto {
  stationId: number;
}
