// src/components/admin/AdminUserTable.tsx
import { roleLabel } from '@/app/admin/utils/userRoleLabel';
import { AdminUser } from '@/types/admin/admin-users';

interface Props {
  users: AdminUser[];
  onDetail?: (id: number) => void;
  onEdit?: (id: number) => void;
}
export default function AdminUserTable({ users, onDetail, onEdit }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full whitespace-nowrap">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">ID</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">이름</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">이메일</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">권한</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">상태</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">가입일</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700"></th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan={7} className="py-12 text-center text-gray-400">
                등록된 회원이 없습니다.
              </td>
            </tr>
          )}
          {users.map(u => (
            <tr key={u.id} className="border-b hover:bg-blue-50 transition">
              <td className="px-6 py-4 text-sm text-gray-900">{u.id}</td>
              <td className="px-6 py-4 text-sm font-semibold text-primary-700">{u.name}</td>
              <td className="px-6 py-4 text-sm">{u.email}</td>
              <td className="px-6 py-4 text-sm">{roleLabel(u.role)}</td>
              <td className="px-6 py-4 text-sm">
                <span className={
                  u.isActive
                    ? 'inline-block rounded-full px-3 py-1 text-xs bg-green-100 text-green-700'
                    : 'inline-block rounded-full px-3 py-1 text-xs bg-gray-100 text-gray-500'
                }>
                  {u.isActive ? '활성' : '비활성'}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '-'}</td>
              <td className="px-6 py-4 text-right">
                {onDetail && (
                  <button
                    onClick={e => { e.stopPropagation(); onDetail(u.id); }}
                    className="text-xs rounded px-2 py-1 font-medium text-primary-600 hover:bg-primary-50"
                  >상세</button>
                )}
                {onEdit && (
                  <button
                    onClick={e => { e.stopPropagation(); onEdit(u.id); }}
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
