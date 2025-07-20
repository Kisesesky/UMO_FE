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
    <div style={{ overflowX: 'auto' }}>
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} style={col.width ? { width: col.width } : {}}>
                {col.header}
              </th>
            ))}
            {actions && <th>액션</th>}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)}>로딩 중...</td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)}>{emptyText}</td>
            </tr>
          ) : (
            data.map(row => (
              <tr
                key={rowKey(row)}
                tabIndex={0}
                onClick={() => onRowClick?.(row)}
                style={onRowClick ? { cursor: 'pointer' } : {}}
              >
                {columns.map((col, idx) => (
                  <td key={idx}>{col.accessor(row)}</td>
                ))}
                {actions && <td>{actions(row)}</td>}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <style jsx>{`
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        .admin-table th, .admin-table td {
          padding: 0.8rem;
          border-bottom: 1px solid #eaeaea;
          text-align: left;
        }
        .admin-table th {
          background: #f5f7fa;
        }
        .admin-table tr:hover {
          background: #f1f6fb;
        }
      `}</style>
    </div>
  );
}
