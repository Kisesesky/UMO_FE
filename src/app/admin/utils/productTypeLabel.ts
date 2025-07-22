// src/app/admin/utils/productTypeLabel.ts
export function productTypeLabel(type: string) {
  switch (type) {
    case 'DIGITAL': return '디지털';
    case 'PHYSICAL': return '실물';
    case 'SUBSCRIPTION': return '구독권';
    default: return type;
  }
}
