import React, { useEffect } from 'react';
import '../App.css'; // Adjust the path as per your project structure.

const MapPage = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        // 사용자의 현재 위치를 얻기
        navigator.geolocation.getCurrentPosition((position) => {
          const userLat = position.coords.latitude; // 사용자의 위도
          const userLng = position.coords.longitude; // 사용자의 경도

          const container = document.getElementById('map__kakao');
          const options = {
            center: new window.kakao.maps.LatLng(userLat, userLng), // 지도의 중심을 사용자의 위치로 설정
            level: 3,
          };
          const map = new window.kakao.maps.Map(container, options);

          // 마커 생성
          const markerPosition = new window.kakao.maps.LatLng(userLat, userLng);
          const marker = new window.kakao.maps.Marker({ position: markerPosition });

          // 지도 위에 마커를 표시
          marker.setMap(map);
        });
      });
    };
  }, []);

  return (
    <div>
      <h1>Map Page</h1>
      <div id="map__kakao" style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
};

export default MapPage;
