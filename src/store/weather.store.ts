// src/store/weather.store.ts
import { create } from 'zustand';
import { WeatherService } from '../services/weather.service';
import { CurrentWeatherResponse, WeeklyWeatherResponse } from '../types/weather';

interface WeatherState {
  currentWeather: CurrentWeatherResponse | null;
  weeklyForecast: WeeklyWeatherResponse | null;
  isLoading: boolean;
  error: string | null;
  
  fetchCurrentWeather: (latitude?: number, longitude?: number) => Promise<void>;
  fetchWeeklyForecast: (latitude?: number, longitude?: number) => Promise<void>;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  currentWeather: null,
  weeklyForecast: null,
  isLoading: false,
  error: null,
  
  fetchCurrentWeather: async (latitude?: number, longitude?: number) => {
    set({ isLoading: true, error: null });
    try {
      const query = latitude && longitude ? { latitude, longitude } : undefined;
      const weather = await WeatherService.getCurrentWeather(query);
      set({ currentWeather: weather, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || '날씨 정보를 불러오는데 실패했습니다.', 
        isLoading: false 
      });
    }
  },
  
  fetchWeeklyForecast: async (latitude?: number, longitude?: number) => {
    set({ isLoading: true, error: null });
    try {
      const query = latitude && longitude ? { latitude, longitude } : undefined;
      const forecast = await WeatherService.getWeeklyForecast(query);
      set({ weeklyForecast: forecast, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || '주간 예보를 불러오는데 실패했습니다.', 
        isLoading: false 
      });
    }
  }
}));