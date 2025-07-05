// src/services/weather.service.ts
import api from './api';
import { CurrentWeatherResponse, WeeklyWeatherResponse, WeatherQuery } from '../types/weather';

export const WeatherService = {
  /**
   * 현재 날씨 정보를 조회합니다.
   * @param query 위도, 경도 (선택 사항, 없으면 백엔드 기본값 사용)
   */
  async getCurrentWeather(query?: WeatherQuery): Promise<CurrentWeatherResponse> {
    const response = await api.get<CurrentWeatherResponse>('/weather/current', { params: query });
    return response.data;
  },

  /**
   * 특정 날짜의 날씨 예보를 조회합니다.
   * (백엔드에서 구현되었다면 사용)
   * @param date 예보 날짜 (YYYY-MM-DD)
   * @param query 위도, 경도 (선택 사항)
   */
  async getDailyForecast(date: string, query?: WeatherQuery): Promise<any> {
    // 백엔드 API가 이 기능을 제공하는 경우에 맞춰 수정
    const response = await api.get(`/weather/daily/${date}`, { params: query });
    return response.data;
  },

  /**
   * 주간 날씨 예보를 조회합니다.
   * @param query 위도, 경도 (선택 사항)
   */
  async getWeeklyForecast(query?: WeatherQuery): Promise<WeeklyWeatherResponse> {
    const response = await api.get<WeeklyWeatherResponse>('/weather/weekly', { params: query });
    return response.data;
  },
};