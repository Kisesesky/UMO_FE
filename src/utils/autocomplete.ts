// src/utils/autocomplete.ts
export const emailDomains = [
  'gmail.com', 'naver.com', 'nate.com', 'daum.net', 'hanmail.net',
  'kakao.com', 'hotmail.com', 'icloud.com', 'outlook.com'
];

export function getHint(value: string, domains: string[] = emailDomains) {
  const atIndex = value.indexOf('@');
  if (atIndex > -1) {
    const keyword = value.slice(atIndex + 1).toLowerCase();
    if (keyword.length > 0) {
      const found = domains.find(domain => domain.startsWith(keyword));
      if (found) return value.slice(0, atIndex + 1) + found;
    }
  }
  return '';
}
