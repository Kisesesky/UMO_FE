// src/components/admin/AdminLogTable.tsx
import { logActionLabel, logTypeLabel } from '@/app/admin/utils/logLabel';
import { AdminLog } from '@/types/admin/admin-logs';

interface Props {
  logs: AdminLog[];
}

export default function AdminLogTable({ logs }: Props) {
  return (
    <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 shadow-sm">
      <table className="min-w-full whitespace-nowrap bg-white dark:bg-gray-900">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
            {['일시', '관리자', '액션', '타입', '상세'].map((header) => (
              <th
                key={header}
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-12 text-center text-gray-400 dark:text-gray-500">
                운영 로그 내역이 없습니다.
              </td>
            </tr>
          ) : (
            logs.map((l) => (
              <tr
                key={l.id}
                className="border-b dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  {l.createdAt ? new Date(l.createdAt).toLocaleString() : '-'}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-primary-700 dark:text-primary-300">
                  {l.admin?.name ?? '-'}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      l.action === 'LOGIN'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : l.action === 'REMOVE'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {logActionLabel(l.action)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">
                  {logTypeLabel(l.targetType)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200">
                  {l.message ?? '-'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
