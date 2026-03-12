import { useEffect, useRef } from "react";

// 카카오맵 SDK 스크립트 로딩을 담당하는 훅
// SDK 준비 완료 시 onSdkReady 콜백 호출 (1회만 실행)
export function useKakaoMapLoader(onSdkReady: () => void): void {
  const callbackRef = useRef(onSdkReady);
  callbackRef.current = onSdkReady;

  useEffect(() => {
    const bootstrap = () =>
      window.kakao.maps.load(() => callbackRef.current());

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="dapi.kakao.com"]'
    );

    if (existing) {
      if (window.kakao?.maps) {
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
}
