// src/components/admin/AdminOrderTable.tsx
import AdminTable from './AdminTable';
import { AdminOrder } from '@/types/admin/admin-orders';

interface Props {
  orders: AdminOrder[];
  onDetail: (id: number) => void;
  onComplete?: (id: number) => void;
  onCancel?: (id: number) => void;
}
export default function AdminOrderTable({ orders, onDetail, onComplete, onCancel }: Props) {
  const columns = [
    { header: 'ID', accessor: (o: AdminOrder) => o.id },
    { header: '유저', accessor: (o: AdminOrder) => o.user?.name ?? '-' },
    { header: '상품', accessor: (o: AdminOrder) => o.product?.name ?? '-' },
    { header: '상태', accessor: (o: AdminOrder) => o.status },
    { header: '금액', accessor: (o: AdminOrder) => o.amount.toLocaleString() },
    { header: '주문일', accessor: (o: AdminOrder) => new Date(o.createdAt).toLocaleString() },
  ];
  return (
    <AdminTable<AdminOrder>
      columns={columns}
      data={orders}
      rowKey={o => o.id}
      actions={o => (
        <>
          <button onClick={e => { e.stopPropagation(); onDetail(o.id); }}>상세</button>
          {onComplete && o.status !== 'COMPLETE' && (
            <button onClick={e => { e.stopPropagation(); onComplete(o.id); }}>완료</button>
          )}
          {onCancel && o.status !== 'CANCELED' && (
            <button onClick={e => { e.stopPropagation(); onCancel(o.id); }}>취소</button>
          )}
        </>
      )}
    />
  );
}
