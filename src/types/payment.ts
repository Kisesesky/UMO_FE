// src/types/payment.ts
export interface PaymentRequest {
  imp_uid: string;
  merchant_uid: string;
  amount: number;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  paymentData: any;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  name: string;
  last4: string;
  isDefault: boolean;
}