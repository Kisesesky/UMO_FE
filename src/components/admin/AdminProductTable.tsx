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
    <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 shadow-sm">
      <table className="min-w-full whitespace-nowrap bg-white dark:bg-gray-900">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
            {['ID', '이름', '타입', '가격', '상태', '수정일', ''].map((header, idx) => (
              <th
                key={idx}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 ${idx === 6 ? 'text-right' : ''}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-12 text-center text-gray-400 dark:text-gray-500">
                등록된 상품이 없습니다.
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id} className="border-b dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{p.id}</td>
                <td className="px-6 py-4 text-sm font-semibold text-primary-700 dark:text-primary-400">{p.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{productTypeLabel(p.productType)}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                  <span className="font-mono">{Number(p.price).toLocaleString()}</span>
                  <span className="ml-1 text-gray-400 dark:text-gray-500">{p.currencyType}</span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={
                    p.isActive
                      ? 'inline-block rounded-full px-3 py-1 text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : 'inline-block rounded-full px-3 py-1 text-xs bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                  }>
                    {p.isActive ? '활성' : '비활성'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-400">
                  {p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : '-'}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  {onEdit && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onEdit(p.id); }}
                      className="text-xs rounded px-2 py-1 font-medium text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900"
                    >
                      수정
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onDelete(p.id); }}
                      className="text-xs rounded px-2 py-1 font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900"
                    >
                      삭제
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
