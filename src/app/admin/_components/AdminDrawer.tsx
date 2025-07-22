// src/app/admin/_components/AdminDrawer.tsx
import Link from "next/link";

export default function AdminDrawer() {
  return (
    <aside className="w-56 bg-white border-r px-4 py-8">
      <nav>
        <ul className="space-y-3 text-sm font-semibold">
          <li><Link href="/admin">대시보드</Link></li>
          <li><Link href="/admin/orders">주문</Link></li>
          <li><Link href="/admin/products">상품</Link></li>
          <li><Link href="/admin/users">회원</Link></li>
          <li><Link href="/admin/stations">대여소</Link></li>
          <li><Link href="/admin/umbrellas">우산</Link></li>
          <li><Link href="/admin/coupons">쿠폰</Link></li>
          <li><Link href="/admin/events">이벤트</Link></li>
          <li><Link href="/admin/logs">운영로그</Link></li>
          <li><Link href="/admin/profile">내정보</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
