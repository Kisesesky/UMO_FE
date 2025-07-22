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
    <div className="overflow-x-auto">
      <table className="min-w-full whitespace-nowrap rounded-xl shadow admin-table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-6 py-3 text-xs font-semibold text-gray-700 bg-gray-50 border-b"
                style={col.width ? { width: col.width } : {}}
              >
                {col.header}
              </th>
            ))}
            {actions && <th className="px-6 py-3 text-xs font-semibold text-gray-700 bg-gray-50 border-b">액션</th>}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className="py-10 text-center text-gray-400">
                로딩 중...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className="py-10 text-center text-gray-400">
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map(row => (
              <tr
                key={rowKey(row)}
                tabIndex={0}
                className={onRowClick ? 'hover:bg-blue-50 transition cursor-pointer' : ''}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col, idx) => (
                  <td key={idx} className="px-6 py-4 text-sm text-gray-800 border-b">
                    {col.accessor(row)}
                  </td>
                ))}
                {actions && <td className="px-6 py-4 text-right border-b">{actions(row)}</td>}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <style jsx>{`
        .admin-table {
          border-collapse: collapse;
        }
        .admin-table th {
          font-weight: 600;
        }
        .admin-table tr:last-child td {
          border-bottom: none;
        }
      `}</style>
    </div>
  );
}
