// src/types/admin/admin-dashboard.ts

// 전체 통계 요약  
export interface AdminDashboardStats {
  users: number;        // 전체 회원수
  umbrellas: number;    // 전체 우산수
  orders: number;       // 전체 주문수
  stations: number;     // 대여소 개수
  churuTotal: number;   // 총 츄르 잔액
  catnipTotal?: number; // (옵션) 총 캣닢 잔액
  // 기타 필요한 현황 필드
}

// 일별/월별/분류별 차트(매출·신규가입 등)
export interface DashboardChartData {
  dateLabels: string[];         // ['07-01', ...]
  orders?: number[];            // 일별 주문수
  newUsers?: number[];          // 일별 신규회원
  churuTopup?: number[];        // 츄르 충전 건수/액수
  // 추가로 이벤트, 대여·반납, 분실 등 원하는 지표
  [key: string]: any;           // 확장 필드
}

// 최근 이벤트, 알람, 장애 등(필요하다면)
export interface DashboardEvent {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  type?: string;                // 이벤트/공지/알림 등
}

