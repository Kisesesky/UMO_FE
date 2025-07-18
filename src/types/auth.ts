// src/types/auth.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  agreedTerms: boolean;
  agreedPrivacy: boolean;
  profileImage?: File;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

export interface UserProfile {
  id: number;
  email: string;
  nickname: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}
