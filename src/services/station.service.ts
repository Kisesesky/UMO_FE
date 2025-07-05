// src/services/station.service.ts
import api from './api';
import { Station, Umbrella } from '../types/rental'; // Umbrella 타입 임포트 추가

export const StationService = {
  async getAllStations(): Promise<Station[]> {
    const response = await api.get<Station[]>('/stations');
    return response.data;
  },

  async getStationById(id: number): Promise<Station> {
    const response = await api.get<Station>(`/stations/${id}`);
    return response.data;
  },

  async getNearestStation(latitude: number, longitude: number): Promise<Station> {
    const response = await api.get<Station>('/stations/nearest', {
      params: { latitude, longitude }
    });
    return response.data;
  },

  async getUmbrellasInStation(stationId: number): Promise<Umbrella[]> {
    const response = await api.get<Umbrella[]>(`/stations/${stationId}/umbrellas`);
    return response.data;
  }
};