// src/types/kakao-types.ts
export interface LatLng {
  lat: number;
  lng: number;
}

export type KakaoMarker = kakao.maps.Marker;

export interface KakaoMapRef {
  getMapInstance(): kakao.maps.Map | null;
  addMarker(position: LatLng, options?: any): KakaoMarker | null;
  clearMarkers(): void;
  moveToCurrentLocation(): void;
}

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
