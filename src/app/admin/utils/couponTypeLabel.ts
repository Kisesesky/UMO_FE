// src/app/admin/utils/couponTypeLabel.ts
export function couponTypeLabel(type: string) {
  // ex. couponType: 'CASH', 'PERCENT', 'DELIVERY'
  switch (type) {
    case 'CASH': return '금액할인';
    case 'PERCENT': return '비율할인';
    case 'DELIVERY': return '배송할인';
    default: return type;
  }
}

export function formatDate(dateString: string) {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString();
  } catch {
    return dateString;
  }
}
