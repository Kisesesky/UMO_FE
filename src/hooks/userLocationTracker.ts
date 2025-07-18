// src/hooks/userLocationTracker.ts
import { useEffect, useRef } from "react";
import { sendCurrentLocationToServer } from "@/services/location.service";

export interface LocationPayload {
  latitude: number;
  longitude: number;
}

interface Options {
  watch?: boolean;
  interval?: number;
}

export function useUserLocationTracker({ watch = true, interval = 30000 }: Options = {}) {
  // watch: true면 watchPosition 사용, false면 한번만 getCurrentPosition 사용
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!watch) return;

    if ("geolocation" in navigator) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          await sendCurrentLocationToServer({ latitude, longitude });
        },
        (err) => {
          // 예외: 위치 권한 거부 등
          console.error("위치정보 취득 실패", err);
        },
        { enableHighAccuracy: true, maximumAge: interval, timeout: 3000 }
      );
    }

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [watch, interval]);

  // 단발성 추적 함수 (버튼 클릭 등으로 호출할 수 있음)
  const getLocationOnce = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        await sendCurrentLocationToServer({ latitude, longitude });
      });
    }
  };

  return { getLocationOnce };
}
