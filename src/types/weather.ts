// src/types/weather.ts
export interface CurrentWeatherResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  temperature: number; // 기온
  humidity: number;    // 습도
  weatherCondition: string; // 날씨 상태 (예: 맑음, 비, 눈)
  precipitationProb: number; // 강수 확률 (%)
  windSpeed: number;   // 풍속 (m/s)
  location: string;    // 위치명 (예: 서울 중구)
  observedAt: string;  // 관측 시간 (YYYY-MM-DD HH:mm:ss)
}

export interface DailyWeatherForecast {
  date: string; // 예보 날짜 (YYYY-MM-DD)
  minTemp: number; // 최저 기온
  maxTemp: number; // 최고 기온
  amWeather: string; // 오전 날씨 (예: 맑음, 구름많음, 비)
  pmWeather: string; // 오후 날씨
  amRainProb: number; // 오전 강수 확률
  pmRainProb: number; // 오후 강수 확률
}

export interface WeeklyWeatherResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  location: string; // 지역명
  forecasts: DailyWeatherForecast[]; // 일별 예보 목록
}

export interface WeatherQuery {
  latitude?: number; // 위도
  longitude?: number; // 경도
}