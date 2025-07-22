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
    <div className="overflow-x-auto">
      <table className="min-w-full whitespace-nowrap">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">ID</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">쿠폰명</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">종류</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">할인률</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">상태</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">만료일</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700"></th>
          </tr>
        </thead>
        <tbody>
          {coupons.length === 0 && (
            <tr>
              <td colSpan={7} className="py-12 text-center text-gray-400">
                등록된 쿠폰이 없습니다.
              </td>
            </tr>
          )}
          {coupons.map(c => (
            <tr key={c.id} className="border-b hover:bg-blue-50 transition">
              <td className="px-6 py-4 text-sm text-gray-900">{c.id}</td>
              <td className="px-6 py-4 text-sm font-semibold text-primary-700">{c.name}</td>
              <td className="px-6 py-4 text-sm">{couponTypeLabel(c.couponType)}</td>
              <td className="px-6 py-4 text-sm">{c.discount}%</td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={
                    c.isUsed
                      ? 'inline-block rounded-full px-3 py-1 text-xs bg-gray-100 text-gray-500'
                      : 'inline-block rounded-full px-3 py-1 text-xs bg-green-100 text-green-700'
                  }
                >
                  {c.isUsed ? '사용됨' : '미사용'}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {c.expiryDate ? formatDate(c.expiryDate) : '-'}
              </td>
              <td className="px-6 py-4 text-right">
                {onIssue && !c.isUsed && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onIssue(c.id);
                    }}
                    className="text-xs rounded px-2 py-1 font-medium text-primary-600 hover:bg-primary-50">
                    발급
                  </button>
                )}
                {onRemove && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onRemove(c.id);
                    }}
                    className="ml-2 text-xs rounded px-2 py-1 font-medium text-red-600 hover:bg-red-100">
                    삭제
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
