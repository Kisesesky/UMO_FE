// src/components/admin/AdminCouponTable.tsx
import { couponTypeLabel, formatDate } from '@/app/admin/utils/couponTypeLabel';
import { AdminCoupon } from '@/types/admin/admin-coupons';

interface Props {
  coupons: AdminCoupon[];
  onIssue?: (id: number) => void;
  onRemove?: (id: number) => void;
}
export default function AdminCouponTable({ coupons, onIssue, onRemove }: Props) {
  return (
    <div className="overflow-x-auto rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
      <table className="min-w-full whitespace-nowrap bg-white dark:bg-gray-900">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
            {[
              'ID',
              '쿠폰명',
              '종류',
              '할인률',
              '상태',
              '만료일',
              '작업',
            ].map((header, idx) => (
              <th
                key={header}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 ${
                  idx === 6 ? 'text-right' : ''
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {coupons.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="py-12 text-center text-gray-400 dark:text-gray-500"
              >
                등록된 쿠폰이 없습니다.
              </td>
            </tr>
          ) : (
            coupons.map(c => (
              <tr
                key={c.id}
                className="border-b dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{c.id}</td>
                <td className="px-6 py-4 text-sm font-semibold text-primary-700 dark:text-primary-300">
                  {c.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {couponTypeLabel(c.couponType)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{c.discount}%</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      c.isUsed
                        ? 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                        : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    }`}
                  >
                    {c.isUsed ? '사용됨' : '미사용'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                  {c.expiryDate ? formatDate(c.expiryDate) : '-'}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  {onIssue && !c.isUsed && (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onIssue(c.id);
                      }}
                      className="text-xs rounded px-2 py-1 font-medium text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition"
                      aria-label={`쿠폰 ${c.id} 발급`}
                    >
                      발급
                    </button>
                  )}
                  {onRemove && (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onRemove(c.id);
                      }}
                      className="text-xs rounded px-2 py-1 font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 transition"
                      aria-label={`쿠폰 ${c.id} 삭제`}
                    >
                      삭제
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
