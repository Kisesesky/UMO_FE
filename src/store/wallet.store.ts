// src/store/wallet.store.ts
import { create } from 'zustand';
import { WalletService } from '../services/wallet.service';

interface WalletState {
  wallet: {
    churuBalance: number;
    catnipBalance: number;
  } | null;
  isLoading: boolean;
  error: string | null;
  fetchWallet: () => Promise<void>;
  chargeChuru: (amount: number) => Promise<void>;
}

export const useWalletStore = create<WalletState>((set) => ({
  wallet: null,
  isLoading: false,
  error: null,

  fetchWallet: async () => {
    set({ isLoading: true, error: null });
    try {
      const churuResponse = await WalletService.getChuruBalance();
      const catnipResponse = await WalletService.getCatnipBalance();
      
      set({ 
        wallet: {
          churuBalance: churuResponse.churuBalance,
          catnipBalance: catnipResponse.catnipBalance
        }, 
        isLoading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || '지갑 정보를 불러오는데 실패했습니다.', 
        isLoading: false 
      });
    }
  },

  chargeChuru: async (amount: number) => {
    set({ isLoading: true, error: null });
    try {
      await WalletService.chargeChuru({ amount });
      // 충전 후 잔액 다시 불러오기
      const churuResponse = await WalletService.getChuruBalance();
      const catnipResponse = await WalletService.getCatnipBalance();
      
      set({ 
        wallet: {
          churuBalance: churuResponse.churuBalance,
          catnipBalance: catnipResponse.catnipBalance
        }, 
        isLoading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || '츄르 충전에 실패했습니다.', 
        isLoading: false 
      });
    }
  }
}));