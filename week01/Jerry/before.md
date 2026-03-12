# MapPage 리팩토링 전 코드 분석
## 변경 전 코드 (MapPage.tsx)
```tsx
import { useEffect, useRef, useState } from "react";
import SearchMapBar from "../components/common/SearchMapBar";
import PinInfoModal from "../components/PinInfoModal";
import { useFetchPlacesWithinBounds } from "../hooks/queries/useFetchPlacesWithinBounds";
import { Place } from "../types/place";
import { getPinImageSrc } from "../utils/getPinImageSrc";
import pinMe from "../assets/pin/pin_me.png";
import { useMapViewStore } from "../stores/mapViewStore";

declare global {
	interface Window { kakao: any; }
}

function MapPage() {
	// Refs
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<any>(null);
	const markerRefList = useRef<any[]>([]);
	const meMarkerRef = useRef<any>(null);

	// Store
	const { center, setCenter } = useMapViewStore();

	// Local states
	const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
	const [isMapLoaded, setIsMapLoaded] = useState(false);
	const [currentLat, setCurrentLat] = useState<number | null>(null);
	const [currentLng, setCurrentLng] = useState<number | null>(null);

	const shouldFetch = currentLat !== null && currentLng !== null;
	const { data: places = [] } = useFetchPlacesWithinBounds(
		shouldFetch
			? {
					latMin: Number((currentLat! - 0.009).toFixed(5)),
					latMax: Number((currentLat! + 0.009).toFixed(5)),
					lngMin: Number((currentLng! - 0.0114).toFixed(5)),
					lngMax: Number((currentLng! + 0.0114).toFixed(5)),
				}
			: { latMin: 0, latMax: 0, lngMin: 0, lngMax: 0 },
		shouldFetch
	);

	function createMap(container: HTMLDivElement, lat: number, lng: number) {
		const center = new window.kakao.maps.LatLng(lat, lng);
		return new window.kakao.maps.Map(container, { center, level: 3 });
	}

	function placeMyLocationMarker(map: any, lat: number, lng: number) {
		const pos = new window.kakao.maps.LatLng(lat, lng);
		if (meMarkerRef.current) meMarkerRef.current.setMap(null);

		meMarkerRef.current = new window.kakao.maps.Marker({
			position: pos,
			map,
			title: "현재 위치",
			image: new window.kakao.maps.MarkerImage(
				pinMe,
				new window.kakao.maps.Size(36, 36),
				{ offset: new window.kakao.maps.Point(18, 36) }
			),
			zIndex: 10000,
			clickable: false
		});
	}

	useEffect(() => {
		const existing = document.querySelector('script[src*="dapi.kakao.com"]') as HTMLScriptElement | null;

		const bootstrap = () => {
			window.kakao.maps.load(() => {
				const tryPlaceMyLocationMarker = () => {
					if (!navigator.geolocation || !mapRef.current) return;
					navigator.geolocation.getCurrentPosition(
						(pos) => {
							const myLat = pos.coords.latitude;
							const myLng = pos.coords.longitude;
							placeMyLocationMarker(mapRef.current, myLat, myLng);
						},
						(err) => {
							console.warn("내 위치 마커를 표시할 수 없습니다:", err);
						},
						{ enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
					);
				};

				const initWith = (lat: number, lng: number) => {
					if (!mapContainerRef.current) return;
					mapRef.current = createMap(mapContainerRef.current, lat, lng);
					setIsMapLoaded(true);
					setCurrentLat(lat);
					setCurrentLng(lng);
					tryPlaceMyLocationMarker();
				};

				if (center.lat !== null && center.lng !== null) {
					initWith(center.lat, center.lng);
					return;
				}

				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(
						(pos) => {
							const { latitude: lat, longitude: lng } = pos.coords;
							initWith(lat, lng);
							setCenter(lat, lng);
						},
						(err) => {
							alert("위치 정보를 불러올 수 없어요. 기본 위치로 설정합니다.");
							console.error(err);
							const defaultLat = 37.566826;
							const defaultLng = 126.9786567;
							initWith(defaultLat, defaultLng);
							setCenter(defaultLat, defaultLng);
						}
					);
				} else {
					alert("위치 정보를 지원하지 않습니다. 기본 위치로 설정합니다.");
					const defaultLat = 37.566826;
					const defaultLng = 126.9786567;
					initWith(defaultLat, defaultLng);
					setCenter(defaultLat, defaultLng);
				}
			});
		};

		if (existing) {
			if ((window as any).kakao && window.kakao.maps) {
				bootstrap();
			} else {
				existing.addEventListener("load", bootstrap, { once: true });
			}
			return;
		}

		const script = document.createElement("script");
		script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false&libraries=services`;
		script.async = true;
		script.onload = bootstrap;
		document.head.appendChild(script);
	}, []);

	useEffect(() => {
		if (!mapRef.current || currentLat === null || currentLng === null) return;

		markerRefList.current.forEach((m) => m.setMap(null));
		markerRefList.current = [];

		const newMarkers = places.map((place: Place) => {
			const imageSrc = getPinImageSrc(place.pinCategory);
			const image = new window.kakao.maps.MarkerImage(
				imageSrc,
				new window.kakao.maps.Size(36, 36),
				{ offset: new window.kakao.maps.Point(18, 36) }
			);

			const marker = new window.kakao.maps.Marker({
				position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
				map: mapRef.current,
				title: place.title,
				image
			});

			window.kakao.maps.event.addListener(marker, "click", () => {
				if (selectedPlace?.placeId !== place.placeId) setSelectedPlace(place);
			});

			return marker;
		});

		markerRefList.current = newMarkers;
	}, [places, currentLat, currentLng, selectedPlace?.placeId]);

	return (
		<div className="w-full h-full relative">
			{isMapLoaded && mapRef.current && (
				<SearchMapBar
					map={mapRef.current}
					onChangeCenter={(lat, lng) => {
						setCurrentLat(lat);
						setCurrentLng(lng);
						setCenter(lat, lng);
					}}
				/>
			)}
			<div ref={mapContainerRef} className="w-full h-[calc(100vh-60px)] border border-gray-200" />
			<PinInfoModal place={selectedPlace} onClose={() => setSelectedPlace(null)} />
		</div>
	);
}

export default MapPage;
```
## 변경이 필요한 이유
리팩토링 전 `MapPage` 컴포넌트는 지도 초기화, 카카오 SDK 로딩, 현재 위치 마커 생성, 장소 마커 생성 및 관리, 지도 범위 계산 등 여러 기능을 하나의 파일 안에서 동시에 처리하고 있었다.
이러한 구조는 하나의 컴포넌트가 여러 책임을 함께 가지는 형태이기 때문에, 코드의 역할이 명확하게 구분되지 않고 길이도 길어져 가독성이 떨어질 수 있다.
또한 카카오 SDK 로딩 로직이나 마커 생성 로직처럼 다른 지도 관련 페이지에서도 활용할 수 있는 기능이 페이지 내부에 직접 작성되어 있어 재사용성이 낮았다.
따라서 각 로직을 공통 훅과 유틸 함수로 분리하여 페이지 컴포넌트는 화면 구성과 상태 연결에 집중하고, 세부 기능은 역할에 따라 나누는 방향으로 구조를 개선할 필요가 있었다.

## 참조 파일 
1. MapPage.tsx
2. useKakaoMapLoader.ts
3. usePlaceMarkers.ts 
4. mapBounds.ts