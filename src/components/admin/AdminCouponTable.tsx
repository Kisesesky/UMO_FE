// src/components/admin/AdminCouponTable.tsx
import { AdminCoupon } from '@/types/admin/admin-coupons';
import AdminTable from './AdminTable';

interface Props {
  coupons: AdminCoupon[];
  onIssue?: (id: number) => void;
  onRemove?: (id: number) => void;
}
export default function AdminCouponTable({ coupons, onIssue, onRemove }: Props) {
  const columns = [
    { header: 'ID', accessor: (e: AdminCoupon) => e.id },
    { header: '쿠폰명', accessor: (e: AdminCoupon) => e.name },
    { header: '종류', accessor: (e: AdminCoupon) => e.couponType },
    { header: '할인', accessor: (e: AdminCoupon) => `${e.discount}%` },
    { header: '상태', accessor: (e: AdminCoupon) => e.isUsed ? '사용됨' : '미사용' },
    { header: '만료일', accessor: (e: AdminCoupon) => e.expiryDate },
  ];
  return (
    <AdminTable<AdminCoupon>
      columns={columns}
      data={coupons}
      rowKey={c => c.id}
      actions={c => (
        <>
          {onIssue && !c.isUsed && (
            <button onClick={e => { e.stopPropagation(); onIssue(c.id); }}>발급</button>
          )}
          {onRemove && (
            <button onClick={e => { e.stopPropagation(); onRemove(c.id); }}>삭제</button>
          )}
        </>
      )}
    />
  );
}
