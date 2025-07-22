// src/app/admin/utils/logLabel.ts
export function logActionLabel(action: string) {
  switch (action) {
    case 'LOGIN': return '로그인';
    case 'LOGOUT': return '로그아웃';
    case 'UPDATE': return '정보수정';
    case 'REMOVE': return '삭제';
    case 'CREATE': return '생성';
    case 'PASSWORD_CHANGE': return '비밀번호 변경';
    default: return action;
  }
}

export function logTypeLabel(type: string) {
  switch (type) {
    case 'ADMIN': return '관리자';
    case 'COUPON': return '쿠폰';
    case 'EVENT': return '이벤트';
    default: return type ?? '-';
  }
}
