// src/hooks/userLocationTracker.ts
import { useEffect, useRef } from "react";
import { sendCurrentLocationToServer } from "@/services/location.service";
import { getDistanceFromLatLonInMeters } from "@/utils/haversine";

export interface LocationPayload {
  latitude: number;
  longitude: number;
}

interface Options {
  watch?: boolean;
  interval?: number;
  minMoveDistance?: number;
}

export function useUserLocationTracker({ watch = true, interval = 30000, minMoveDistance = 30, }: Options = {}) {
  // watch: true면 watchPosition 사용, false면 한번만 getCurrentPosition 사용
  const watchIdRef = useRef<number | null>(null);
  const lastSentRef = useRef<number>(0);
  const lastCoordsRef = useRef<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    if (!watch) return;

    if ("geolocation" in navigator) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        async (pos) => {
          const now = Date.now();
          const { latitude, longitude } = pos.coords;

          // 거리 계산
          let shouldSend = false;
          if (!lastCoordsRef.current) {
            shouldSend = true;
          } else {
            const dist = getDistanceFromLatLonInMeters(
              lastCoordsRef.current.latitude, lastCoordsRef.current.longitude,
              latitude, longitude
            );
            shouldSend = dist >= minMoveDistance; // 30미터(기본)
          }

          if (shouldSend && now - lastSentRef.current >= interval) {
            lastSentRef.current = now;
            lastCoordsRef.current = { latitude, longitude };
            try {
              await sendCurrentLocationToServer({ latitude, longitude });
            } catch (e) {
              console.error("위치정보 서버전송 실패", e);
            }
          }
        },
        (err) => {
          console.error("위치정보 취득 실패", err);
        },
        { enableHighAccuracy: true, maximumAge: interval, timeout: 6000 }
      );
    }

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [watch, interval, minMoveDistance]);

  // 단발성 추적(버튼)
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
