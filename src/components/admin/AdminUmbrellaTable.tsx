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
    <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 shadow-sm">
      <table className="min-w-full whitespace-nowrap bg-white dark:bg-gray-900">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">코드</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">상태</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">대여소</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">등록일</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300">액션</th>
          </tr>
        </thead>
        <tbody>
          {umbrellas.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-12 text-center text-gray-400 dark:text-gray-500"
              >
                등록된 우산이 없습니다.
              </td>
            </tr>
          ) : (
            umbrellas.map((u) => (
              <tr
                key={u.id}
                className="border-b dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
              >
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{u.id}</td>
                <td className="px-6 py-4 text-sm font-mono text-gray-800 dark:text-gray-300">{u.code}</td>
                <td className="px-6 py-4 text-sm">
                  <UmbrellaStatusBadge status={u.status} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{u.station?.name ?? '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-400">
                  {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '-'}
                </td>
                <td className="px-6 py-4 text-right space-x-1">
                  {onDetail && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDetail(u.id);
                      }}
                      className="text-xs rounded px-2 py-1 font-medium text-primary-600 hover:bg-primary-50 dark:hover:bg-gray-700"
                    >
                      상세
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(u.id);
                      }}
                      className="text-xs rounded px-2 py-1 font-medium text-blue-700 hover:bg-blue-100 dark:hover:bg-gray-700"
                    >
                      수정
                    </button>
                  )}
                  {onMarkLost && u.status !== 'LOST' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('정말 분실 처리 하시겠습니까?')) {
                          onMarkLost(u.id);
                        }
                      }}
                      className="text-xs rounded px-2 py-1 font-medium text-red-700 hover:bg-red-100 dark:hover:bg-gray-700"
                    >
                      분실
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
