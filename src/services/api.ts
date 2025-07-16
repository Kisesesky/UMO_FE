// src/services/api.ts
import axios from 'axios';

// 백엔드 API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 - 에러 처리
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 401 에러 (인증 만료) 처리
    if (error.response?.status === 401) {
      // 로그아웃 처리 또는 토큰 갱신 로직
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;