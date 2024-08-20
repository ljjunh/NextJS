/*global kakao*/
// eslint같은 정적 분석 도구에게 kakao라는 전역 변수가 존재한다는 것을 알려줌
import Script from "next/script";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  const loadKaKaoMap = () => {
    // kakao map 코드
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      new window.kakao.maps.Map(mapContainer, mapOption);
    });
  };
  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKaKaoMap}
      />
      <div id="map" className="w-full h-screen"></div>
    </>
  );
}
