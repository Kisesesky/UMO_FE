// src/types/rental.ts
export interface Station {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Umbrella {
  id: number;
  code: string;
  status: string;
  isLost: boolean;
  rentalFeePerHour: number;
  price: number;
  stationId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Rental {
  id: number;
  userId: number;
  umbrellaId: number;
  rentalStart: string;
  rentalEnd?: string;
  status: string;
  rentalStationId: number;
  returnStationId?: number;
  totalFee: number;
  depositAmount: number;
  createdAt: string;
  updatedAt: string;
  umbrella?: Umbrella;
}

export interface RentUmbrellaRequest {
  umbrellaId: number;
}

export interface ReturnUmbrellaRequest {
  stationId: number;
}