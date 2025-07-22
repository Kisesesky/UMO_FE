// src/app/admin/utils/adminRoleLabel.ts
export function roleLabel(role: string) {
  switch (role) {
    case 'SUPER_ADMIN': return '슈퍼 관리자';
    case 'GENERAL_ADMIN': return '일반 관리자';
    case 'SUPPORT_ADMIN': return '지원 관리자';
    default: return role;
  }
}
