// src/types/admin/admin-order.ts
export interface AdminOrder {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
    // 추가 정보 필요 시 더 삽입
  };
  product: {
    id: number;
    name: string;
    productType: string;
    currencyType: string;
  };
  status: 'PENDING' | 'COMPLETE' | 'CANCELED';
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  productId: number;
  // 옵션: 기타 주문 시 필요 파라미터
}

export interface OrderResponseDto extends AdminOrder {}
