// src/types/kakao.d.ts

export {}; // 모듈 방지용, 반드시 아래에 작성

declare global {
  // 전역 window 객체 확장
  interface Window {
    kakao: typeof kakao;
  }

  namespace kakao {
    namespace maps {
      class LatLng {
        constructor(lat: number, lng: number);
        getLat(): number;
        getLng(): number;
      }

      class Marker {
        constructor(options: any);
        setMap(map: Map | null): void;
      }

      class InfoWindow {
        constructor(options: any);
        open(map: Map, marker: Marker): void;
        close(): void;
      }

      class MarkerImage {
        constructor(src: string, size: Size, options?: any);
      }

      class Size {
        constructor(width: number, height: number);
      }

      class Point {
        constructor(x: number, y: number);
      }

      class Map {
        constructor(container: HTMLElement, options: any);
        setCenter(latlng: LatLng): void;
        getCenter(): LatLng;
        setLevel(level: number): void;
        getLevel(): number;
      }

      namespace event {
        function addListener(target: any, eventName: string, handler: Function): void;
        function removeListener(listener: any): void;
      }

      function load(callback: () => void): void;
    }
  }
}
