// src/components/admin/AdminUmbrellaTable.tsx
import { UmbrellaStatusBadge } from '@/app/admin/utils/umbrellaStatusBadge';
import { AdminUmbrella } from '@/types/admin/admin-umbrellas';

interface Props {
  umbrellas: AdminUmbrella[];
  onDetail?: (id: number) => void;
  onMarkLost?: (id: number) => void;
  onEdit?: (id: number) => void;
}

export default function AdminUmbrellaTable({ umbrellas, onDetail, onMarkLost, onEdit }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full whitespace-nowrap">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">ID</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">코드</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">상태</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">대여소</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">등록일</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700"></th>
          </tr>
        </thead>
        <tbody>
          {umbrellas.length === 0 && (
            <tr>
              <td colSpan={6} className="py-12 text-center text-gray-400">
                등록된 우산이 없습니다.
              </td>
            </tr>
          )}
          {umbrellas.map((u) => (
            <tr key={u.id} className="border-b hover:bg-blue-50 transition">
              <td className="px-6 py-4 text-sm text-gray-900">{u.id}</td>
              <td className="px-6 py-4 text-sm font-mono">{u.code}</td>
              <td className="px-6 py-4 text-sm">
                <UmbrellaStatusBadge status={u.status} />
              </td>
              <td className="px-6 py-4 text-sm">{u.station?.name ?? '-'}</td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '-'}
              </td>
              <td className="px-6 py-4 text-right">
                {onDetail && (
                  <button
                    onClick={e => { e.stopPropagation(); onDetail(u.id); }}
                    className="text-xs rounded px-2 py-1 font-medium text-primary-600 hover:bg-primary-50"
                  >상세</button>
                )}
                {onEdit && (
                  <button
                    onClick={e => { e.stopPropagation(); onEdit(u.id); }}
                    className="ml-1 text-xs rounded px-2 py-1 font-medium text-blue-700 hover:bg-blue-100"
                  >수정</button>
                )}
                {onMarkLost && u.status !== 'LOST' && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      if (window.confirm('정말 분실 처리 하시겠습니까?')) {
                        onMarkLost(u.id);
                      }
                    }}
                    className="ml-1 text-xs rounded px-2 py-1 font-medium text-red-700 hover:bg-red-100"
                  >분실</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}