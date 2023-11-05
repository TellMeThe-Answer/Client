import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const MapPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [map, setMap] = useState(null);
  const deleteAllMarkers = () => {
    localStorage.removeItem('markers');
  };
  // 지도 스크립트를 로드하는 함수
  const loadMapScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false`;
      document.head.appendChild(script);

      script.onload = () => resolve(window.kakao.maps.load(resolve));
    });
  };

  useEffect(() => {
    let isCancelled = false;

    loadMapScript().then(() => {
      if (isCancelled) return;

      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };
        const createdMap = new window.kakao.maps.Map(container, options);
        if (!isCancelled) setMap(createdMap);

        const locPosition = new window.kakao.maps.LatLng(latitude, longitude);
        const currentMarker = new window.kakao.maps.Marker({
          position: locPosition,
          map: createdMap,
          title: '현재 위치',
        });

        // 현재 위치에 대한 인포윈도우를 생성하고 마커에 연결합니다.
        const infowindow = new window.kakao.maps.InfoWindow({
          content: '<div style="padding:5px;">현재 위치</div>',
        });
        infowindow.open(createdMap, currentMarker);

        // 로컬 스토리지에 저장된 마커를 불러오고, 신고 위치에 마커를 추가합니다.
        const storedMarkers = JSON.parse(localStorage.getItem('markers')) || [];
        if (location.state && location.state.newReport) {
          const newReportWithDate = {
            ...location.state.newReport,
            date: new Date().toISOString().slice(0, 10), // 현재 날짜 추가
          };
          storedMarkers.push(newReportWithDate);
          localStorage.setItem('markers', JSON.stringify(storedMarkers));
        }

        storedMarkers.forEach((m) => {
          const position = new window.kakao.maps.LatLng(m.lat, m.lng);
          const marker = new window.kakao.maps.Marker({
            position: position,
            map: createdMap,
            title: '신고된 위치',
          });

          // 마커 클릭 시 이벤트 리스너를 추가합니다.
          window.kakao.maps.event.addListener(marker, 'click', () => {
            alert(`Marker Details:\nLatitude: ${m.lat}\nLongitude: ${m.lng}\nDate: ${m.date}`);
          });
        });

        // 지도를 마커 기준으로 중앙 정렬합니다.
        if (storedMarkers.length > 0) {
          const bounds = new window.kakao.maps.LatLngBounds();
          storedMarkers.forEach((m) => {
            bounds.extend(new window.kakao.maps.LatLng(m.lat, m.lng));
          });
          bounds.extend(locPosition);
          createdMap.setBounds(bounds);
        }
      });
    });

    return () => {
      isCancelled = true;
    };
  }, [location.state]);

  // 뒤로 가기 버튼 함수
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <button onClick={goBack} style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 5
      }}>
        <FaArrowLeft size={20} />
      </button>
      {/*<button onClick={deleteAllMarkers}>모든 마커 삭제</button> */}

      <div id="map" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default MapPage;
