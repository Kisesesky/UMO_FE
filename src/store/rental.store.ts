// src/store/rental.store.ts
import { create } from 'zustand';
import { RentalService } from '../services/rental.service';
import { StationService } from '../services/station.service';
import { Rental, Station, Umbrella } from '../types/rental';

interface RentalState {
  rentals: Rental[];
  activeRental: Rental | null;
  stations: Station[];
  selectedStation: Station | null;
  umbrellas: Umbrella[];
  isLoading: boolean;
  error: string | null;
  
  fetchMyRentals: () => Promise<void>;
  fetchActiveRental: () => Promise<void>;
  fetchStations: () => Promise<void>;
  fetchUmbrellasInStation: (stationId: number) => Promise<void>;
  selectStation: (station: Station) => void;
  rentUmbrella: (umbrellaId: number) => Promise<Rental>;
  confirmRental: (rentalId: number) => Promise<Rental>;
  returnUmbrella: (rentalId: number, stationId: number) => Promise<Rental>;
  cancelRental: (rentalId: number) => Promise<Rental>;
}

export const useRentalStore = create<RentalState>((set, get) => ({
  rentals: [],
  activeRental: null,
  stations: [],
  selectedStation: null,
  umbrellas: [],
  isLoading: false,
  error: null,

  fetchMyRentals: async () => {
    set({ isLoading: true, error: null });
    try {
      const rentals = await RentalService.getMyRentals();
      set({ rentals, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || '대여 내역을 불러오는데 실패했습니다.', 
        isLoading: false 
      });
    }
  },

  fetchActiveRental: async () => {
    set({ isLoading: true, error: null });
    try {
      const rentals = await RentalService.getMyRentals();
      const activeRental = rentals.find(rental => 
        rental.status === 'PENDING' || rental.status === 'RENTED'
      ) || null;
      set({ activeRental, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || '활성 대여 정보를 불러오는데 실패했습니다.', 
        isLoading: false 
      });
    }
  },

  fetchStations: async () => {
    set({ isLoading: true, error: null });
    try {
      const stations = await StationService.getAllStations();
      set({ stations, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || '대여소 정보를 불러오는데 실패했습니다.', 
        isLoading: false 
      });
    }
  },

  fetchUmbrellasInStation: async (stationId: number) => {
    set({ isLoading: true, error: null });
    try {
      const umbrellas = await StationService.getUmbrellasInStation(stationId);
      set({ umbrellas, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || '우산 정보를 불러오는데 실패했습니다.', 
        isLoading: false 
      });
    }
  },

  selectStation: (station: Station) => {
    set({ selectedStation: station });
    get().fetchUmbrellasInStation(station.id);
  },

  rentUmbrella: async (umbrellaId: number) => {
    set({ isLoading: true, error: null });
    try {
      const rental = await RentalService.rentUmbrella({ umbrellaId });
      await get().fetchActiveRental();
      set({ isLoading: false });
      return rental;
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || '우산 대여에 실패했습니다.', 
        isLoading: false 
      });
      throw error;
    }
  },

  confirmRental: async (rentalId: number) => {
    set({ isLoading: true, error: null });
    try {
      const rental = await RentalService.confirmRental(rentalId);
      await get().fetchActiveRental();
      set({ isLoading: false });
      return rental;
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || '대여 확정에 실패했습니다.', 
        isLoading: false 
      });
      throw error;
    }
  },

  returnUmbrella: async (rentalId: number, stationId: number) => {
    set({ isLoading: true, error: null });
    try {
      const rental = await RentalService.returnUmbrella(rentalId, { stationId });
      await get().fetchActiveRental();
      set({ isLoading: false });
      return rental;
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || '우산 반납에 실패했습니다.', 
        isLoading: false 
      });
      throw error;
    }
  },

  cancelRental: async (rentalId: number) => {
    set({ isLoading: true, error: null });
    try {
      const rental = await RentalService.cancelRental(rentalId);
      await get().fetchActiveRental();
      set({ isLoading: false });
      return rental;
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || '대여 취소에 실패했습니다.', 
        isLoading: false 
      });
      throw error;
    }
  }
}));