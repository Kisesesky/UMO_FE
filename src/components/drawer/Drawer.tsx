// src/components/Drawer.tsx
'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { FaBullhorn, FaCog, FaCreditCard, FaGift, FaHeadset, FaHistory, FaQuestionCircle, FaSignInAlt, FaSignOutAlt, FaTicketAlt, FaTimes, FaUmbrella, FaUserFriends, FaWallet } from 'react-icons/fa';
import { useAuthStore } from '../../store/auth.store';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// 메뉴 아이템 정의 (경로, 아이콘, 인증 필요 여부 등 포함)
const menuItems = [
  { id: 'login', label: '이용하기', subtext: '지금 가입하면 할인쿠폰을 드려요', path: '/login', icon: FaSignInAlt, authRequired: false, isAuthItem: true },
  { id: 'logout', label: '로그아웃', path: '/login', icon: FaSignOutAlt, authRequired: true, isAuthItem: true, isLogout: true }, // isLogout 플래그 추가
  { id: 'wallet', label: '지갑 관리', subtext: '내 츄르와 캣닢을 관리해요', path: '/wallet', icon: FaWallet, authRequired: true },
  { id: 'rent', label: '우산 대여', subtext: '가까운 우산을 대여해요', path: '/rent', icon: FaUmbrella, authRequired: true },
  { id: 'history', label: '이용 기록', path: '/my-rentals', icon: FaHistory, authRequired: true },
  { id: 'pass', label: '이용권 구매', subtext: '언제나 부담없이', path: '/products?type=PASS', icon: FaTicketAlt }, // 예시 경로
  { id: 'payment', label: '결제 수단', path: '/payment-methods', icon: FaCreditCard }, // 예시 경로
  { id: 'coupon', label: '쿠폰', path: '/coupons', icon: FaGift }, // 예시 경로
  { id: 'friend', label: '친구 초대', subtext: '같이 공유해봐요', path: '/invite-friends', icon: FaUserFriends }, // 예시 경로
  { id: 'notice', label: '공지사항', path: '/notice', icon: FaBullhorn }, // 예시 경로
  { id: 'event', label: '이벤트', path: '/events', icon: FaGift }, // 예시 경로
  { id: 'guide', label: '이용 방법', subtext: '쉽게 이용하세요!', path: '/guide', icon: FaQuestionCircle }, // 예시 경로
  { id: 'settings', label: '설정', path: '/settings', icon: FaCog }, // 예시 경로
];

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // ESC 키로 드로어 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // 드로어 외부 클릭 시 닫기
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleMenuItemClick = async (item: typeof menuItems[0]) => {
    onClose(); // 메뉴 클릭 시 드로어 닫기
    if (item.isLogout) {
      await logout();
      router.push(item.path); // 로그아웃 후 지정된 경로로 이동
    } else {
      router.push(item.path);
    }
  };

  // 로그인/로그아웃 상태에 따라 메뉴 필터링
  const filteredMenuItems = menuItems.filter(item => {
    if (item.isAuthItem) {
      // isAuthItem이 true인 경우:
      // - 로그인 메뉴는 비인증 상태일 때만
      // - 로그아웃 메뉴는 인증 상태일 때만
      return (item.id === 'login' && !isAuthenticated) || (item.id === 'logout' && isAuthenticated);
    }
    // 그 외 메뉴는 인증이 필요하면 인증 상태일 때만, 아니면 항상
    return !item.authRequired || isAuthenticated;
  });

  const renderMenuItem = (item: typeof menuItems[0]) => (
    <li key={item.id}>
      <button className="drawer-menu-item" onClick={() => handleMenuItemClick(item)}>
        {item.icon && React.createElement(item.icon, { size: 20 })}
        <span className="menu-item-label">{item.label}</span>
        {item.subtext && <span className="menu-item-subtext">{item.subtext}</span>}
      </button>
    </li>
  );

  if (!isOpen) return null;

  return (
    <div className={`drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-backdrop" onClick={handleOutsideClick} />
      <div className="drawer-panel">
        {/* --- 헤더 부분 여기서부터 --- */}
        <div className="drawer-header flex items-center justify-between">
          {isAuthenticated ? (
            <div className="drawer-title flex items-center gap-3 py-1">
              <img
                src={user?.profileImage || '/assets/character/umo-face.png'}
                alt="프로필 이미지"
                className="rounded-full w-10 h-10 border border-gray-200 shadow object-cover bg-white"
                style={{ objectFit: 'cover' }}
              />
              <span className="font-semibold text-gray-900">{user?.name || '사용자'}님</span>
            </div>
          ) : (
            <div className="drawer-title flex flex-col py-1">
              <span className="font-semibold">로그인 / 회원가입</span>
              <span className="drawer-subtitle text-xs text-gray-500">지금 가입하면 할인쿠폰을 드려요</span>
            </div>
          )}
          <button onClick={onClose} className="drawer-close-btn ml-4">
            <FaTimes size={20} />
          </button>
        </div>
        {/* --- 헤더 끝 --- */}

        {/* 나머지 메뉴 및 내용은 기존 코드 유지 */}
        <nav className="drawer-content">
          <ul>
            {filteredMenuItems.map((item) => (
              <React.Fragment key={item.id}>
                {item.id === 'notice' && (
                  <li>
                    <hr className="my-2 border-t border-gray-200" />
                  </li>
                )}
                {renderMenuItem(item)}
              </React.Fragment>
            ))}
          </ul>
        </nav>

        <div className="drawer-footer">
          <button
            className="customer-service-btn"
            onClick={() => {
              onClose();
              router.push('/customer-service');
            }}
          >
            <FaHeadset />
            <span>고객센터</span>
          </button>
        </div>
      </div>
    </div>
  );
}
