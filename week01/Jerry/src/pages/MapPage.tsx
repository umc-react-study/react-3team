import { useCallback, useRef, useState } from "react";

import SearchMapBar from "../components/common/SearchMapBar";
import PinInfoModal from "../components/PinInfoModal";
import { useKakaoMapLoader } from "../hooks/useKakaoMapLoader";
import { usePlaceMarkers } from "../hooks/usePlaceMarkers";
import { useFetchPlacesWithinBounds } from "../hooks/queries/useFetchPlacesWithinBounds";
import { useMapViewStore } from "../stores/mapViewStore";
import { calcBounds } from "../utils/mapBounds";
import { Place } from "../types/place";
import pinMe from "../assets/pin/pin_me.png";

declare global {
	interface Window { kakao: any; }
}

const DEFAULT_LAT = 37.566826;
const DEFAULT_LNG = 126.9786567;

function MapPage() {
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<any>(null);
	const meMarkerRef = useRef<any>(null);

	const { center, setCenter } = useMapViewStore();
	const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
	const [isMapLoaded, setIsMapLoaded] = useState(false);
	const [currentLat, setCurrentLat] = useState<number | null>(null);
	const [currentLng, setCurrentLng] = useState<number | null>(null);

	// 지도 생성 + 상태 업데이트만 담당 (내 위치 마커 X)
	function initWith(lat: number, lng: number) {
		if (!mapContainerRef.current) return;
		mapRef.current = new window.kakao.maps.Map(mapContainerRef.current, {
			center: new window.kakao.maps.LatLng(lat, lng),
			level: 3,
		});
		setCurrentLat(lat);
		setCurrentLng(lng);
		setIsMapLoaded(true);
	}

	// GPS 성공 시에만 내 위치 마커를 찍음
	function placeMyLocationMarker(lat: number, lng: number) {
		if (meMarkerRef.current) meMarkerRef.current.setMap(null);
		meMarkerRef.current = new window.kakao.maps.Marker({
			position: new window.kakao.maps.LatLng(lat, lng),
			map: mapRef.current,
			title: "현재 위치",
			image: new window.kakao.maps.MarkerImage(
				pinMe,
				new window.kakao.maps.Size(36, 36),
				{ offset: new window.kakao.maps.Point(18, 36) }
			),
			zIndex: 10000,
			clickable: false,
		});
	}

	// 지도가 준비된 후 GPS를 별도로 조회해 마커만 찍음
	function tryPlaceMyLocationMarker() {
		if (!navigator.geolocation) return;
		navigator.geolocation.getCurrentPosition(
			({ coords }) => {
				placeMyLocationMarker(coords.latitude, coords.longitude);
			},
			(err) => {
				console.warn("내 위치 마커를 표시할 수 없습니다:", err);
			},
			{ enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
		);
	}

	// SDK 로딩 (중복 제거)
	useKakaoMapLoader(() => {
		// center가 있는 경우(복귀): 저장된 시야로 지도 초기화 후 GPS 마커만 별도 시도
		if (center.lat !== null && center.lng !== null) {
			initWith(center.lat, center.lng);
			tryPlaceMyLocationMarker();
			return;
		}

		// 첫 진입: 기본 위치로 지도를 먼저 띄운 뒤, GPS 성공 시 중심 이동 + 마커 + center 저장
		initWith(DEFAULT_LAT, DEFAULT_LNG);

		if (!navigator.geolocation) {
			setCenter(DEFAULT_LAT, DEFAULT_LNG);
			return;
		}

		navigator.geolocation.getCurrentPosition(
			({ coords }) => {
				const { latitude: lat, longitude: lng } = coords;
				mapRef.current?.setCenter(new window.kakao.maps.LatLng(lat, lng));
				setCurrentLat(lat);
				setCurrentLng(lng);
				placeMyLocationMarker(lat, lng);
				setCenter(lat, lng);
			},
			(err) => {
				console.warn("위치 정보를 불러올 수 없어요:", err);
				setCenter(DEFAULT_LAT, DEFAULT_LNG);
			}
		);
	});

	// 범위 계산 (중복 제거)
	const shouldFetch = currentLat !== null && currentLng !== null;
	const { data: places = [] } = useFetchPlacesWithinBounds(
		shouldFetch
			? calcBounds(currentLat!, currentLng!)
			: { latMin: 0, latMax: 0, lngMin: 0, lngMax: 0 },
		shouldFetch
	);

	// 마커 생성/관리 (중복 제거)
	usePlaceMarkers({
		map: isMapLoaded ? mapRef.current : null,
		places,
		onMarkerClick: (place) => {
			if (selectedPlace?.placeId !== place.placeId) setSelectedPlace(place);
		},
	});

	const handleChangeCenter = useCallback(
		(lat: number, lng: number) => {
			setCurrentLat(lat);
			setCurrentLng(lng);
			setCenter(lat, lng);
		},
		[setCenter]
	);

	return (
		<div className="w-full h-full relative">
			{isMapLoaded && mapRef.current && (
				<SearchMapBar
					map={mapRef.current}
					onChangeCenter={handleChangeCenter}
				/>
			)}
			<div ref={mapContainerRef} className="w-full h-[calc(100vh-60px)] border border-gray-200" />
			<PinInfoModal place={selectedPlace} onClose={() => setSelectedPlace(null)} />
		</div>
	);
}

export default MapPage;
