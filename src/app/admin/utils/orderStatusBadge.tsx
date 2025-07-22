// src/app/admin/utils/orderStatusBadge.tsx
export function OrderStatusBadge({ status }: { status?: string }) {
  if (status === 'COMPLETE')
    return <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">완료</span>
  if (status === 'CANCELED')
    return <span className="inline-block px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">취소</span>
  return <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">{status ?? '-'}</span>
}
