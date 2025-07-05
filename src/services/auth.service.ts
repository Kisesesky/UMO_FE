// src/services/auth.service.ts
import api from './api';
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';

export const AuthService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
  },

  async getProfile(): Promise<AuthResponse['user']> {
    const response = await api.get<AuthResponse['user']>('/auth/profile');
    return response.data;
  }
};