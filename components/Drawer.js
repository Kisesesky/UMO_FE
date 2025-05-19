'use client'

import { useEffect } from 'react'
import { FaHeadset } from 'react-icons/fa'

const menuItems = [
  { 
    id: 'login',
    label: '로그인 / 회원가입',
    subtext: '지금 가입한다 할인쿠폰을 드려요'
  },
  { 
    id: 'pass', 
    label: '패스', 
    subtext: '없이나 부담없이' 
  },
  { id: 'history', label: '이용기록' },
  { id: 'payment', label: '결제수단' },
  { id: 'coupon', label: '쿠폰' },
  { id: 'friend', label: '친구초대', subtext: '친구가 더 길이 되자!' },
  { id: 'notice', label: '공지사항' },
  { id: 'event', label: '이벤트' },
  { id: 'guide', label: '이용방법', subtext: '안전하게 이용하세요!' },
  { id: 'settings', label: '설정' },
]

export default function Drawer({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null;

  return (
    <div className="drawer">
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="drawer-panel">
        <div className="drawer-header">
          <div className="drawer-title">
            <span>로그인 / 회원가입</span>
            <span className="drawer-subtitle">지금 가입한다 할인쿠폰을 드려요</span>
          </div>
        </div>
        
        <nav className="drawer-content">
          <ul>
            {menuItems.slice(1).map(item => (
              <li key={item.id}>
                <button
                  className="drawer-menu-item"
                  onClick={() => console.log(`${item.id} clicked`)}
                >
                  <span className="menu-item-label">{item.label}</span>
                  {item.subtext && (
                    <span className="menu-item-subtext">{item.subtext}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="drawer-footer">
          <button
            className="customer-service-btn"
            onClick={() => console.log('customer service clicked')}
          >
            <FaHeadset />
            <span>고객센터</span>
          </button>
        </div>
      </div>
    </div>
  );
}
