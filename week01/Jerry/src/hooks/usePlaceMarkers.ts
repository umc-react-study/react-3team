import { useEffect, useRef } from "react";

import { getPinImageSrc } from "../utils/getPinImageSrc";
import { Place } from "../types/place";

interface UsePlaceMarkersOptions {
  map: any;
  places: Place[];
  onMarkerClick: (place: Place) => void;
}

// 장소 마커 생성/제거를 담당하는 훅
export function usePlaceMarkers({ map, places, onMarkerClick }: UsePlaceMarkersOptions) {
  const markerListRef = useRef<any[]>([]);

  useEffect(() => {
    if (!map) return;

    markerListRef.current.forEach((m) => m.setMap(null));
    markerListRef.current = [];

    markerListRef.current = places.map((place) => {
      const image = new window.kakao.maps.MarkerImage(
        getPinImageSrc(place.pinCategory),
        new window.kakao.maps.Size(36, 36),
        { offset: new window.kakao.maps.Point(18, 36) }
      );

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
        map,
        title: place.title,
        image,
      });

      window.kakao.maps.event.addListener(marker, "click", () =>
        onMarkerClick(place)
      );

      return marker;
    });
  }, [map, places]);
}
