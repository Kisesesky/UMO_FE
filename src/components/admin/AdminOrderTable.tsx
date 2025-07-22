// src/components/admin/AdminOrderTable.tsx
import { OrderStatusBadge } from '@/app/admin/utils/orderStatusBadge';
import { AdminOrder } from '@/types/admin/admin-orders';

interface Props {
  orders: AdminOrder[];
  onDetail: (id: number) => void;
  onComplete?: (id: number) => void;
  onCancel?: (id: number) => void;
}

export default function AdminOrderTable({
  orders, onDetail, onComplete, onCancel,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full whitespace-nowrap">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">ID</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">유저</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">상품</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">상태</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">금액</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">주문일</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700"></th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 && (
            <tr>
              <td colSpan={7} className="py-12 text-center text-gray-400">
                주문 내역이 없습니다.
              </td>
            </tr>
          )}
          {orders.map((o) => (
            <tr key={o.id} className="border-b hover:bg-blue-50 transition">
              <td className="px-6 py-4 text-sm text-gray-900">{o.id}</td>
              <td className="px-6 py-4 text-sm">{o.user?.name ?? '-'}</td>
              <td className="px-6 py-4 text-sm">{o.product?.name ?? '-'}</td>
              <td className="px-6 py-4 text-sm">
                <OrderStatusBadge status={o.status} />
              </td>
              <td className="px-6 py-4 text-sm">{o.amount?.toLocaleString()}원</td>
              <td className="px-6 py-4 text-sm">{o.createdAt ? new Date(o.createdAt).toLocaleString() : '-'}</td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={e => { e.stopPropagation(); onDetail(o.id); }}
                  className="text-xs rounded px-2 py-1 font-medium text-primary-600 hover:bg-primary-50"
                >상세</button>
                {onComplete && o.status !== 'COMPLETE' && (
                  <button
                    onClick={e => { e.stopPropagation(); onComplete(o.id); }}
                    className="ml-1 text-xs rounded px-2 py-1 font-medium text-green-700 hover:bg-green-100"
                  >완료</button>
                )}
                {onCancel && o.status !== 'CANCELED' && (
                  <button
                    onClick={e => { e.stopPropagation(); onCancel(o.id); }}
                    className="ml-1 text-xs rounded px-2 py-1 font-medium text-red-600 hover:bg-red-100"
                  >취소</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
