// src/components/WeatherInfo.tsx
'use client';

import { useWeatherStore } from '@/store/weather.store';
import { useEffect } from 'react';
import { FaCloudRain, FaCloud, FaSun, FaSnowflake, FaQuestion } from 'react-icons/fa';

interface WeatherInfoProps {
  latitude?: number;
  longitude?: number;
}

export default function WeatherInfo({ latitude, longitude }: WeatherInfoProps) {
  const { currentWeather, isLoading, error, fetchCurrentWeather } = useWeatherStore();

  useEffect(() => {
    fetchCurrentWeather(latitude, longitude);
    // 5분마다 날씨 정보 갱신
    const interval = setInterval(() => {
      fetchCurrentWeather(latitude, longitude);
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchCurrentWeather, latitude, longitude]);

  // 날씨 상태에 따른 아이콘 선택
  const getWeatherIcon = () => {
    if (!currentWeather) return <FaQuestion size={24} />;
    
    const condition = currentWeather.weatherCondition.toLowerCase();
    
    if (condition.includes('비')) {
      return <FaCloudRain size={24} className="text-blue-500" />;
    } else if (condition.includes('구름')) {
      return <FaCloud size={24} className="text-gray-500" />;
    } else if (condition.includes('맑음')) {
      return <FaSun size={24} className="text-yellow-500" />;
    } else if (condition.includes('눈')) {
      return <FaSnowflake size={24} className="text-blue-300" />;
    } else {
      return <FaQuestion size={24} className="text-gray-400" />;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  if (!currentWeather) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-gray-500 text-sm">날씨 정보를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">현재 날씨</h3>
        {getWeatherIcon()}
      </div>
      
      <div className="text-2xl font-bold mb-2">
        {currentWeather.temperature}°C
      </div>
      
      <div className="text-sm text-gray-600">
        <p>{currentWeather.weatherCondition}</p>
        <p>습도: {currentWeather.humidity}%</p>
        <p>강수확률: {currentWeather.precipitationProb}%</p>
        <p>풍속: {currentWeather.windSpeed}m/s</p>
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        {currentWeather.location} | {new Date(currentWeather.observedAt).toLocaleTimeString()}
      </div>
    </div>
  );
}