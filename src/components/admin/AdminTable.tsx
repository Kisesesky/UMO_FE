// src/components/admin/AdminTable.tsx
import React, { ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessor: (row: T) => ReactNode;
  width?: string | number;
}

interface AdminTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => React.Key;
  onRowClick?: (row: T) => void;
  actions?: (row: T) => ReactNode;
  isLoading?: boolean;
  emptyText?: string;
}

// 실무: 스타일 통일, 반응형, 가독성 증가, 로딩/Empty 처리 개선!
export default function AdminTable<T>({
  columns,
  data,
  rowKey,
  onRowClick,
  actions,
  isLoading,
  emptyText = '데이터가 없습니다.',
}: AdminTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 shadow-sm">
      <table className="min-w-full whitespace-nowrap bg-white dark:bg-gray-900">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
            {columns.map((col, idx) => (
              <th
                key={idx}
                scope="col"
                style={col.width ? { width: col.width } : {}}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300"
              >
                {col.header}
              </th>
            ))}
            {actions && (
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300">
                액션
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="py-10 text-center text-gray-400 dark:text-gray-500"
              >
                로딩 중...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="py-10 text-center text-gray-400 dark:text-gray-500"
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={rowKey(row)}
                tabIndex={0}
                className={
                  'border-b dark:border-gray-700 transition-colors ' +
                  (onRowClick ? 'hover:bg-indigo-50 dark:hover:bg-gray-800 cursor-pointer' : '')
                }
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col, idx) => (
                  <td key={idx} className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">
                    {col.accessor(row)}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4 text-right">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
