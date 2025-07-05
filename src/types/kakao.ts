// src/types/kakao.ts

// Kakao 지도에서 사용하는 위도/경도 타입
export interface LatLng {
  lat: number;
  lng: number;
}

// Kakao 지도 객체 (핵심 메서드만 정의)
export interface KakaoMap {
  getCenter(): LatLng;
  setCenter(position: LatLng): void;
  setLevel(level: number): void;
  getLevel(): number;
}

// Kakao 마커 객체
export interface KakaoMarker {
  setMap(map: KakaoMap | null): void;
}

// Kakao InfoWindow 객체
export interface KakaoInfoWindow {
  open(map: KakaoMap, marker: KakaoMarker): void;
  close(): void;
}

// 마커 이미지
export interface KakaoMarkerImage {}

// 크기 객체
export interface KakaoSize {
  getWidth(): number;
  getHeight(): number;
}

// 포인트 객체
export interface KakaoPoint {
  getX(): number;
  getY(): number;
}

// 지도 컴포넌트에서 사용하는 ref
export interface KakaoMapRef {
  getMapInstance(): KakaoMap | null;
  addMarker(position: LatLng, options?: any): KakaoMarker | null;
  clearMarkers(): void;
  moveToCurrentLocation(): void;
}

// 지도 컴포넌트 props
export interface KakaoMapProps {
  center?: LatLng;
  level?: number;
  onMapLoad?: (map: KakaoMapRef) => void;
  onClick?: (mouseEvent: any) => void;
  onDragEnd?: () => void;
  onZoomChanged?: () => void;
  onMouseMove?: (mouseEvent: any) => void;
  autoCenterCurrentLocation?: boolean;
  onGeolocationError?: (error: GeolocationPositionError) => void;
}

// 이벤트 관련 타입
export interface KakaoEvent {
  addListener: (target: any, eventName: string, handler: any) => any;
  removeListener: (listener: any) => void;
}

// window.kakao.maps 타입 확장
declare global {
  interface Window {
    kakao: {
      maps: {
        Map: new (container: HTMLElement, options: any) => KakaoMap;
        LatLng: new (lat: number, lng: number) => LatLng;
        Marker: new (options: any) => KakaoMarker;
        InfoWindow: new (options: any) => KakaoInfoWindow;
        MarkerImage: new (src: string, size: KakaoSize, options?: any) => KakaoMarkerImage;
        Size: new (width: number, height: number) => KakaoSize;
        Point: new (x: number, y: number) => KakaoPoint;
        event: KakaoEvent;
        load: (callback: () => void) => void;
      };
    };
  }
}
