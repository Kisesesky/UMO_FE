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
    <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 shadow-sm">
      <table className="min-w-full whitespace-nowrap bg-white dark:bg-gray-900">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">이름</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">이메일</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">권한</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">상태</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">가입일</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300">액션</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-12 text-center text-gray-400 dark:text-gray-500">
                등록된 회원이 없습니다.
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u.id} className="border-b dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800 transition">
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{u.id}</td>
                <td className="px-6 py-4 text-sm font-semibold text-primary-700 dark:text-primary-400">{u.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{u.email}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{roleLabel(u.role)}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={
                    u.isActive
                      ? 'inline-block rounded-full px-3 py-1 text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : 'inline-block rounded-full px-3 py-1 text-xs bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                  }>
                    {u.isActive ? '활성' : '비활성'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-400">
                  {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '-'}
                </td>
                <td className="px-6 py-4 text-right space-x-1">
                  {onDetail && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDetail(u.id);
                      }}
                      className="text-xs rounded px-2 py-1 font-medium text-primary-600 hover:bg-primary-50 dark:hover:bg-gray-700"
                    >
                      상세
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(u.id);
                      }}
                      className="text-xs rounded px-2 py-1 font-medium text-blue-700 hover:bg-blue-100 dark:hover:bg-gray-700"
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
