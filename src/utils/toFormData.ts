// src/utils/toFormData.ts
export function toFormData<T extends Record<string, any>>(data: T): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      // File이나 Blob 타입은 그대로 append, 아닌 건 문자열로 변환
      if (value instanceof File || value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    }
  });

  return formData;
}
