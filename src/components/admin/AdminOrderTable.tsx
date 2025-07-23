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
    <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 shadow-sm">
      <table className="min-w-full whitespace-nowrap bg-white dark:bg-gray-900">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
            {['ID', '유저', '상품', '상태', '금액', '주문일', ''].map((header, idx) => (
              <th
                key={idx}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 ${idx === 6 ? 'text-right' : ''}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-12 text-center text-gray-400 dark:text-gray-500">
                주문 내역이 없습니다.
              </td>
            </tr>
          ) : (
            orders.map((o) => (
              <tr key={o.id} className="border-b dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{o.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{o.user?.name ?? '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{o.product?.name ?? '-'}</td>
                <td className="px-6 py-4 text-sm">
                  <OrderStatusBadge status={o.status} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                  {o.amount?.toLocaleString()}원
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-400">
                  {o.createdAt ? new Date(o.createdAt).toLocaleString() : '-'}
                </td>
                <td className="px-6 py-4 text-right space-x-1">
                  <button
                    onClick={e => { e.stopPropagation(); onDetail(o.id); }}
                    className="text-xs rounded px-2 py-1 font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-700"
                  >
                    상세
                  </button>
                  {onComplete && o.status !== 'COMPLETE' && (
                    <button
                      onClick={e => { e.stopPropagation(); onComplete(o.id); }}
                      className="text-xs rounded px-2 py-1 font-medium text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900"
                    >
                      완료
                    </button>
                  )}
                  {onCancel && o.status !== 'CANCELED' && (
                    <button
                      onClick={e => { e.stopPropagation(); onCancel(o.id); }}
                      className="text-xs rounded px-2 py-1 font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900"
                    >
                      취소
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
