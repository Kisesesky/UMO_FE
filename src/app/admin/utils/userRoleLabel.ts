// src/app/admin/utils/userRoleLabel.ts
export function roleLabel(role: string) {
  switch (role) {
    case 'ADMIN': return '관리자';
    case 'MANAGER': return '매니저';
    case 'USER': return '일반회원';
    default: return role;
  }
}
