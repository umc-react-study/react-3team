import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import LoadingSpinner from "../components/common/LoadingSpinner";
import PinInfoModal from "../components/PinInfoModal";
import { useKakaoMapLoader } from "../hooks/useKakaoMapLoader";
import { usePlaceMarkers } from "../hooks/usePlaceMarkers";
import { useFetchPlacesWithinBounds } from "../hooks/queries/useFetchPlacesWithinBounds";
import { Place } from "../types/place";

declare global {
  interface Window { kakao: any; }
}

function SavedPlaceMapPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const [searchParams] = useSearchParams();
  const latMin = Number(searchParams.get("latMin"));
  const latMax = Number(searchParams.get("latMax"));
  const lngMin = Number(searchParams.get("lngMin"));
  const lngMax = Number(searchParams.get("lngMax"));

  const { data: places = [] } = useFetchPlacesWithinBounds(
    { latMin, latMax, lngMin, lngMax },
    true
  );

  // SDK 로딩 (중복 제거)
  useKakaoMapLoader(() => {
    if (!mapContainerRef.current) return;
    const centerLat = (latMin + latMax) / 2;
    const centerLng = (lngMin + lngMax) / 2;
    mapRef.current = new window.kakao.maps.Map(mapContainerRef.current, {
      center: new window.kakao.maps.LatLng(centerLat, centerLng),
      level: 3,
    });
    setIsMapLoaded(true);
  });

  // 마커 생성/관리 (중복 제거)
  usePlaceMarkers({
    map: isMapLoaded ? mapRef.current : null,
    places,
    onMarkerClick: setSelectedPlace,
  });

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      {!isMapLoaded ? (
        <LoadingSpinner size={60} />
      ) : (
        <>
          <div
            ref={mapContainerRef}
            className="w-full h-[calc(100vh-60px)] border border-gray-200"
          />
          <PinInfoModal
            place={selectedPlace}
            onClose={() => setSelectedPlace(null)}
          />
        </>
      )}
    </div>
  );
}

export default SavedPlaceMapPage;
