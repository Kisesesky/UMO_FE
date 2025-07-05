// src/types/wallet.ts
export interface Wallet {
  id: number;
  userId: number;
  churuBalance: number;
  catnipBalance: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChargeChuruRequest {
  amount: number;
}