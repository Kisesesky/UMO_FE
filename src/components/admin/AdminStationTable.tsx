// src/components/admin/AdminStationTable.tsx
import { AdminStation } from '@/types/admin/admin-stations';

interface Props {
  stations: AdminStation[];
  onDetail?: (id: number) => void;
  onEdit?: (id: number) => void;
}
export default function AdminStationTable({ stations, onDetail, onEdit }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full whitespace-nowrap">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">ID</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">이름</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">주소</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">위도</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">경도</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">우산수</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">상태</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">수정일</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700"></th>
          </tr>
        </thead>
        <tbody>
          {stations.length === 0 && (
            <tr>
              <td colSpan={9} className="py-12 text-center text-gray-400">
                등록된 대여소가 없습니다.
              </td>
            </tr>
          )}
          {stations.map((s) => (
            <tr key={s.id} className="border-b hover:bg-blue-50 transition">
              <td className="px-6 py-4 text-sm text-gray-900">{s.id}</td>
              <td className="px-6 py-4 text-sm font-semibold text-primary-700">{s.name}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{s.address ?? '-'}</td>
              <td className="px-6 py-4 text-sm">{s.latitude}</td>
              <td className="px-6 py-4 text-sm">{s.longitude}</td>
              <td className="px-6 py-4 text-sm">{s.umbrellaCount ?? '-'}</td>
              <td className="px-6 py-4 text-sm">
                <span className={
                  s.isActive
                    ? 'inline-block rounded-full px-3 py-1 text-xs bg-green-100 text-green-700'
                    : 'inline-block rounded-full px-3 py-1 text-xs bg-gray-100 text-gray-500'
                }>
                  {s.isActive ? '활성' : '비활성'}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">{s.updatedAt ? new Date(s.updatedAt).toLocaleDateString() : '-'}</td>
              <td className="px-6 py-4 text-right">
                {onDetail && (
                  <button
                    onClick={e => { e.stopPropagation(); onDetail(s.id); }}
                    className="text-xs rounded px-2 py-1 font-medium text-primary-600 hover:bg-primary-50"
                  >상세</button>
                )}
                {onEdit && (
                  <button
                    onClick={e => { e.stopPropagation(); onEdit(s.id); }}
                    className="ml-1 text-xs rounded px-2 py-1 font-medium text-blue-700 hover:bg-blue-100"
                  >수정</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
