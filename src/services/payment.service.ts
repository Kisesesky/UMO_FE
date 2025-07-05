// src/services/payment.service.ts
import api from './api';
import { PaymentRequest, PaymentResponse } from '../types/payment';

export const PaymentService = {
  async verifyPayment(data: PaymentRequest): Promise<PaymentResponse> {
    const response = await api.post<PaymentResponse>('/payments/verify', data);
    return response.data;
  }
};