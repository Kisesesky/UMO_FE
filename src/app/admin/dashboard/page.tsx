// src/app/admin/dashboard/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { FaUmbrella, FaUsers, FaHistory, FaBox, FaWallet } from 'react-icons/fa';
import { AdminDashboardService } from '@/services/admin/admin-dashboard.service';
import { AdminOrdersService } from '@/services/admin/admin-orders.service';
import type { AdminDashboardStats } from '@/types/admin/admin-dashboard';
import type { AdminOrder } from '@/types/admin/admin-orders';
import ProtectedAdminRoute from '@/components/auth/ProtectedAdminRoute';
import AdminOrderTable from '@/components/admin/AdminOrderTable';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Title,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip, Title);

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<AdminOrder[]>([]);
  const [charts, setCharts] = useState<any>(null);

  useEffect(() => {
    AdminDashboardService.getSummary().then(setStats);
    // 최근 주문 5개
    AdminOrdersService.getAll({ limit: 5 }).then(setRecentOrders);
    // 차트 데이터
    AdminDashboardService.getCharts?.().then(setCharts);
  }, []);

  return (
    <ProtectedAdminRoute>
      <h1>관리자 대시보드</h1>
      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginBottom: 32 }}>
        <InfoCard icon={<FaUsers />} label="회원" value={stats?.users ?? 0} unit="명" />
        <InfoCard icon={<FaUmbrella />} label="우산" value={stats?.umbrellas ?? 0} unit="개" />
        <InfoCard icon={<FaHistory />} label="주문" value={stats?.orders ?? 0} unit="건" />
        <InfoCard icon={<FaBox />} label="대여소" value={stats?.stations ?? 0} unit="곳" />
        <InfoCard icon={<FaWallet />} label="전체 잔액" value={stats?.churuTotal ?? 0} unit="츄르" />
      </div>

      <section style={{ marginBottom: 48 }}>
        <h2>최근 주문</h2>
        <AdminOrderTable orders={recentOrders} onDetail={o => {}} />
      </section>

      <section>
        <h2>주문 트렌드</h2>
        {charts?.dateLabels && charts?.orders ? (
          <Line
            data={{
              labels: charts.dateLabels,
              datasets: [
                {
                  label: '일별 주문수',
                  data: charts.orders,
                  backgroundColor: 'rgba(77, 128, 255, 0.2)',
                  borderColor: '#4d80ff',
                  fill: true,
                  tension: 0.25,
                  pointBackgroundColor: "#2577cf"
                }
              ]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true, position: 'top' },
              },
              scales: { y: { beginAtZero: true } }
            }}
            width={800}
            height={320}
          />
        ) : <div>트렌드 데이터를 불러오는 중...</div>}
      </section>
    </ProtectedAdminRoute>
  );
}

// 카드형 지표 컴포넌트 (간단)
function InfoCard({ icon, label, value, unit }: { icon: React.ReactNode; label: string; value: number; unit: string }) {
  return (
    <div style={{
      padding: 24, borderRadius: 12, background: 'white',
      boxShadow: '0 1px 10px #e8e8e8', textAlign: "center"
    }}>
      <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: 20 }}>{label}</div>
      <div style={{ fontSize: 22, margin: '12px 0', color: '#285bb5' }}>{value}{unit}</div>
    </div>
  );
}
