import React, { useEffect } from 'react';
import '../css/App.css'; 
import { BigTitle } from "../components/components";
import { FaArrowLeft } from 'react-icons/fa';

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
            center: new window.kakao.maps.LatLng(userLat, userLng), 
            level: 3,
            draggable: true, // 지도 드래그 가능 여부
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

  const goBack = () => {
    window.history.back(); // 브라우저의 뒤로 가기 기능 호출
  }

  return (
    <div>
      <div style={{ padding: "40px" }}>
        <button onClick={goBack} className="goBackButton">
            <FaArrowLeft size={20}/>
        </button>
        <BigTitle ttl="병해 현황 지도" />
        <div id="map__kakao" style={{ width: '100%', height: '100vh' }}></div>
      </div>
    </div>
  );
};

export default MapPage;