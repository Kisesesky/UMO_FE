// src/services/wallet.service.ts
import api from '@/services/api';
import { Wallet, ChargeChuruRequest } from '../types/wallet';

export const WalletService = {
  async getMyWallet(): Promise<Wallet> {
    const response = await api.get<Wallet>('/wallets/me');
    return response.data;
  },

  async getChuruBalance(): Promise<{ churuBalance: number }> {
    const response = await api.get<{ churuBalance: number }>('/wallets/balance/churu');
    return response.data;
  },

  async getCatnipBalance(): Promise<{ catnipBalance: number }> {
    const response = await api.get<{ catnipBalance: number }>('/wallets/balance/catnip');
    return response.data;
  },

  async chargeChuru(data: ChargeChuruRequest): Promise<Wallet> {
    const response = await api.post<Wallet>('/wallets/deposit/churu', data);
    return response.data;
  }
};