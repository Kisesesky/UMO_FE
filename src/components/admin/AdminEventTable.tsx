// src/components/admin/AdminEventTable.tsx
import type { AdminEvent } from '@/types/admin/admin-events';

interface Props {
  events: AdminEvent[];
  onEdit?: (id: number) => void;
  onRemove?: (id: number) => void;
}
export default function AdminEventTable({ events, onEdit, onRemove }: Props) {
  return (
    <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 shadow-sm">
      <table className="min-w-full whitespace-nowrap bg-white dark:bg-gray-900">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
            {[
              'ID',
              '제목',
              '상태',
              '시작일',
              '종료일',
              '작업',
            ].map((header, idx) => (
              <th
                key={header}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 ${
                  idx === 5 ? 'text-right' : ''
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {events.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-12 text-center text-gray-400 dark:text-gray-500"
              >
                등록된 이벤트가 없습니다.
              </td>
            </tr>
          ) : (
            events.map((e) => (
              <tr
                key={e.id}
                className="border-b dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{e.id}</td>
                <td className="px-6 py-4 text-sm font-semibold text-primary-700 dark:text-primary-300">
                  {e.title}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      e.isActive
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {e.isActive ? '진행중' : '종료'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{e.startDate ?? '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{e.endDate ?? '-'}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(e.id)}
                      className="text-xs rounded px-2 py-1 font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                      aria-label={`이벤트 ${e.id} 수정`}
                    >
                      수정
                    </button>
                  )}
                  {onRemove && (
                    <button
                      onClick={() => onRemove(e.id)}
                      className="text-xs rounded px-2 py-1 font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 transition"
                      aria-label={`이벤트 ${e.id} 삭제`}
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
