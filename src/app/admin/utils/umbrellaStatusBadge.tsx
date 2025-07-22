// src/app/admin/utils/umbrellaStatusBadge.tsx
export function UmbrellaStatusBadge({ status }: { status: string }) {
  if (status === 'LOST')
    return <span className="inline-block px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">분실</span>;
  if (status === 'AVAILABLE')
    return <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">대여가능</span>;
  if (status === 'RENTED')
    return <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">대여중</span>;
  return <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">{status ?? '-'}</span>;
}
