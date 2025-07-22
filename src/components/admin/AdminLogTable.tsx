// src/components/admin/AdminLogTable.tsx
import { logActionLabel, logTypeLabel } from '@/app/admin/utils/logLabel';
import { AdminLog } from '@/types/admin/admin-logs';

interface Props {
  logs: AdminLog[];
}

export default function AdminLogTable({ logs }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full whitespace-nowrap">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">일시</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">관리자</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">액션</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">타입</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">상세</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 && (
            <tr>
              <td colSpan={5} className="py-12 text-center text-gray-400">
                운영 로그 내역이 없습니다.
              </td>
            </tr>
          )}
          {logs.map((l) => (
            <tr
              key={l.id}
              className="border-b hover:bg-blue-50 transition"
            >
              <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                {l.createdAt ? new Date(l.createdAt).toLocaleString() : '-'}
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-primary-700">{l.admin?.name ?? '-'}</td>
              <td className="px-6 py-4 text-sm">
                <span className={
                  "inline-block rounded px-3 py-1 text-xs " +
                  (l.action === 'LOGIN' ? 'bg-green-100 text-green-600'
                    : l.action === 'REMOVE' ? 'bg-red-100 text-red-600'
                    : 'bg-gray-100 text-gray-700')
                }>
                  {logActionLabel(l.action)}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">{logTypeLabel(l.targetType)}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {/* 상세 메시지: message 필드 or 적절한 다른 필드 */}
                {l.message ?? '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
