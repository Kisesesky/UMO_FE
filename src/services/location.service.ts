import { LocationPayload } from "@/hooks/userLocationTracker"; 
import api from '@/services/api';

// 위치정보 POST API 호출 (JWT 토큰은 인터셉터/전역 axios에 세팅해둬야 함)
export async function sendCurrentLocationToServer(location: LocationPayload) {
  // 위치 POST 호출, Jwt 토큰은 api instance에서 인터셉터로 포함해야 함!
  return api.post("/location", location);
}