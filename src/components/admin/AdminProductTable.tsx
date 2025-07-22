// src/components/admin/AdminProductTable.tsx
import { productTypeLabel } from '@/app/admin/utils/productTypeLabel';
import { AdminProduct } from '@/types/admin/admin-products';

interface Props {
  products: AdminProduct[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}
export default function AdminProductTable({ products, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full whitespace-nowrap">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">ID</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">이름</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">타입</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">가격</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">상태</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">수정일</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700"></th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan={7} className="py-12 text-center text-gray-400">
                등록된 상품이 없습니다.
              </td>
            </tr>
          )}
          {products.map(p => (
            <tr key={p.id} className="border-b hover:bg-blue-50 transition">
              <td className="px-6 py-4 text-sm text-gray-900">{p.id}</td>
              <td className="px-6 py-4 text-sm font-semibold text-primary-700">{p.name}</td>
              <td className="px-6 py-4 text-sm">{productTypeLabel(p.productType)}</td>
              <td className="px-6 py-4 text-sm">
                <span className="font-mono">{Number(p.price).toLocaleString()}</span>{" "}
                <span className="text-gray-400">{p.currencyType}</span>
              </td>
              <td className="px-6 py-4 text-sm">
                <span className={
                  p.isActive
                    ? 'inline-block rounded-full px-3 py-1 text-xs bg-green-100 text-green-700'
                    : 'inline-block rounded-full px-3 py-1 text-xs bg-gray-100 text-gray-500'
                }>
                  {p.isActive ? '활성' : '비활성'}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : '-'}
              </td>
              <td className="px-6 py-4 text-right">
                {onEdit && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onEdit(p.id);
                    }}
                    className="text-xs rounded px-2 py-1 font-medium text-blue-700 hover:bg-blue-100"
                  >수정</button>
                )}
                {onDelete && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onDelete(p.id);
                    }}
                    className="ml-2 text-xs rounded px-2 py-1 font-medium text-red-600 hover:bg-red-100"
                  >삭제</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
