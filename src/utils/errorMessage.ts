// src/utils/errormessage.ts

// 공통 에러 메시지 추출 유틸 함수
export function getErrorMessage(error: unknown, fallback: string): string {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as any).response?.data?.message === 'string'
  ) {
    return (error as any).response.data.message;
  }
  return fallback;
}