// src/components/admin/AdminEventTable.tsx
import type { AdminEvent } from '@/types/admin/admin-events';

interface Props {
  events: AdminEvent[];
  onEdit?: (id: number) => void;
  onRemove?: (id: number) => void;
}
export default function AdminEventTable({ events, onEdit, onRemove }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full whitespace-nowrap">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">ID</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">제목</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">상태</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">시작일</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">종료일</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700"></th>
          </tr>
        </thead>
        <tbody>
          {events.length === 0 && (
            <tr>
              <td colSpan={6} className="py-12 text-center text-gray-400">
                등록된 이벤트가 없습니다.
              </td>
            </tr>
          )}
          {events.map((e) => (
            <tr
              key={e.id}
              className="border-b hover:bg-blue-50 transition"
            >
              <td className="px-6 py-4 text-sm text-gray-900">{e.id}</td>
              <td className="px-6 py-4 text-sm text-primary-700 font-bold">{e.title}</td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={
                    e.isActive
                      ? 'inline-block rounded-full px-3 py-1 text-xs bg-green-100 text-green-700'
                      : 'inline-block rounded-full px-3 py-1 text-xs bg-gray-100 text-gray-500'
                  }
                >
                  {e.isActive ? '진행중' : '종료'}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">{e.startDate ?? '-'}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{e.endDate ?? '-'}</td>
              <td className="px-6 py-4 text-right">
                {onEdit && (
                  <button
                    onClick={() => onEdit(e.id)}
                    className="text-xs rounded px-2 py-1 font-medium text-blue-600 hover:bg-blue-100"
                  >
                    수정
                  </button>
                )}
                {onRemove && (
                  <button
                    onClick={() => onRemove(e.id)}
                    className="ml-2 text-xs rounded px-2 py-1 font-medium text-red-600 hover:bg-red-100"
                  >
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
