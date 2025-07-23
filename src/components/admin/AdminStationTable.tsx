// src/components/admin/AdminStationTable.tsx
import { AdminStation } from '@/types/admin/admin-stations';

interface Props {
  stations: AdminStation[];
  onDetail?: (id: number) => void;
  onEdit?: (id: number) => void;
}
export default function AdminStationTable({ stations, onDetail, onEdit }: Props) {
  return (
    <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 shadow-sm">
      <table className="min-w-full whitespace-nowrap bg-white dark:bg-gray-900">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
            {[
              'ID', '이름', '주소', '위도', '경도', '우산수',
              '상태', '수정일', ''
            ].map((header, idx) => (
              <th
                key={idx}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 ${idx === 8 ? 'text-right' : ''}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stations.length === 0 ? (
            <tr>
              <td colSpan={9} className="py-12 text-center text-gray-400 dark:text-gray-500">
                등록된 대여소가 없습니다.
              </td>
            </tr>
          ) : (
            stations.map((s) => (
              <tr key={s.id} className="border-b dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{s.id}</td>
                <td className="px-6 py-4 text-sm font-semibold text-primary-700 dark:text-primary-400">{s.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{s.address ?? '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{s.latitude}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{s.longitude}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{s.umbrellaCount ?? '-'}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={
                    s.isActive
                      ? 'inline-block rounded-full px-3 py-1 text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : 'inline-block rounded-full px-3 py-1 text-xs bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                  }>
                    {s.isActive ? '활성' : '비활성'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-400">
                  {s.updatedAt ? new Date(s.updatedAt).toLocaleDateString() : '-'}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  {onDetail && (
                    <button
                      onClick={e => { e.stopPropagation(); onDetail(s.id); }}
                      className="text-xs rounded px-2 py-1 font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900"
                    >
                      상세
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={e => { e.stopPropagation(); onEdit(s.id); }}
                      className="text-xs rounded px-2 py-1 font-medium text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900"
                    >
                      수정
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
