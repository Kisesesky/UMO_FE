// src/app/admin/page.tsx
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
import dynamic from 'next/dynamic';

// ChartJS related (dynamic import: SSR 방지)
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

// ------ 카드형 지표 컴포넌트 ------
function InfoCard({
  icon,
  label,
  value,
  unit,
  loading,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  unit?: string;
  loading?: boolean;
}) {
  return (
    <div
      className="p-6 rounded-xl bg-white shadow text-center flex flex-col items-center min-h-[120px]"
      style={{ minWidth: 0 }}
    >
      <div className="text-[28px] mb-2">{icon}</div>
      <div className="font-semibold text-lg">{label}</div>
      <div className="text-2xl my-2 font-bold text-primary-700" style={{ color: '#285bb5' }}>
        {loading ? <span className="animate-pulse">-</span> : value}
        {unit}
      </div>
    </div>
  );
}

// ------ 대시보드 본문 ------
export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<AdminOrder[]>([]);
  const [charts, setCharts] = useState<{ dateLabels: string[]; orders: number[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    Promise.all([
      AdminDashboardService.getSummary().then(setStats),
      AdminOrdersService.getAll({ limit: 5 }).then(setRecentOrders),
      AdminDashboardService.getCharts?.().then(data => {
        setCharts({
          dateLabels: data?.dateLabels ?? [],
          orders: data?.orders ?? [],
        });
      }),
    ])
      .catch(() => setError('대시보드 데이터를 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <ProtectedAdminRoute>
        <div className="py-16 text-center font-medium text-gray-400">로딩 중...</div>
      </ProtectedAdminRoute>
    );

  if (error)
    return (
      <ProtectedAdminRoute>
        <div className="py-16 bg-red-50 text-center text-lg text-red-700">{error}</div>
      </ProtectedAdminRoute>
    );

  return (
    <ProtectedAdminRoute>
      <section>
        <h1 className="text-2xl font-bold mb-8">관리자 대시보드</h1>
        <div
          className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 mb-12"
          // 반응형(모바일에서 1~2컬럼)
        >
          <InfoCard icon={<FaUsers />} label="회원" value={stats?.users ?? "-"} unit="명" loading={!stats} />
          <InfoCard icon={<FaUmbrella />} label="우산" value={stats?.umbrellas ?? "-"} unit="개" loading={!stats} />
          <InfoCard icon={<FaHistory />} label="주문" value={stats?.orders ?? "-"} unit="건" loading={!stats} />
          <InfoCard icon={<FaBox />} label="대여소" value={stats?.stations ?? "-"} unit="곳" loading={!stats} />
          <InfoCard icon={<FaWallet />} label="전체 잔액" value={stats?.churuTotal ?? "-"} unit="츄르" loading={!stats} />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-lg font-bold mb-4">최근 주문</h2>
        {recentOrders?.length ? (
          <AdminOrderTable orders={recentOrders} onDetail={() => {}} />
        ) : (
          <div className="text-gray-400 text-center py-8">최근 주문이 없습니다.</div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-bold mb-4">주문 트렌드</h2>
        {charts?.dateLabels?.length && charts?.orders?.length ? (
          <div className="rounded-xl bg-white shadow p-6">
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
                    pointBackgroundColor: "#2577cf",
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true, position: 'top' },
                },
                scales: { y: { beginAtZero: true } },
              }}
              width={800}
              height={340}
            />
          </div>
        ) : (
          <div className="text-gray-400 text-center py-8">트렌드 데이터를 불러오는 중...</div>
        )}
      </section>
    </ProtectedAdminRoute>
  );
}
