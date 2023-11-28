import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import mapData from '../../config/mapData.json'

const MapComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [map, setMap] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [data, setData] = useState();

  useEffect(()=>{

  }, [])
  const Modal = ({ message, onClose }) => {
    // 모달 바깥 부분을 클릭했을 때 닫기
    const handleOutsideClick = (e) => {
      if (e.target.className === 'modal') {
        onClose();
      }
    };
    console.log(message);
    return (
      <div className="modal" onClick={handleOutsideClick}>
        <div className="w-72 h-32 p-4 bg-white rounded-2xl">
            <div>작물 : {data.crop}</div>
            <div>질병 : {data.disease}</div>
            <div>주소 : {data.address}</div>
            <div>신고날짜 : {data.date}</div>
        </div>
      </div>
    );
  };
  
  // 작물별 마커 이미지 경로
  const cropMarkerImages = {
    'tomato': 'https://cdn1.iconfinder.com/data/icons/color-bold-style/21/14_2-1024.png',
    'cucumber': 'https://cdn3.iconfinder.com/data/icons/flat-pro-basic-set-1-1/32/location-green-1024.png',
    'pepper': 'https://cdn1.iconfinder.com/data/icons/color-bold-style/21/14-1024.png',
    'strawberry': 'https://cdn1.iconfinder.com/data/icons/black-bold-style-1/3/14-1024.png',
  };

  const loadMapScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false`;
      document.head.appendChild(script);

      script.onload = () => resolve(window.kakao.maps.load(resolve));
    });
  };

  const initializeMap = (latitude, longitude) => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3, // 적절한 확대 레벨 설정
    };
    const createdMap = new window.kakao.maps.Map(container, options);
    setMap(createdMap);

    const locPosition = new window.kakao.maps.LatLng(latitude, longitude);
    const currentMarker = new window.kakao.maps.Marker({
      position: locPosition,
      map: createdMap,
      title: '현재 위치',
    });

    const infowindow = new window.kakao.maps.InfoWindow({
      content: '<div style="padding-left:42px;">현재 위치</div>',
    });
    infowindow.open(createdMap, currentMarker);

    // 저장된 마커 로드 (예시)

    const storedMarkers = JSON.parse(localStorage.getItem('reports')) || [];
    
    mapData.forEach((m) => {
      const position = new window.kakao.maps.LatLng(m.lat, m.lng);
      const imageSrc = cropMarkerImages[m.crop] || 'default_marker_image.png';
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, new window.kakao.maps.Size(40, 40));
      const marker = new window.kakao.maps.Marker({
        position: position,
        map: createdMap,
        title: '신고된 위치',
        image: markerImage,
      });

      window.kakao.maps.event.addListener(marker, 'click', () => {
        const message = `Marker Details:\nLatitude: ${m.lat}\nLongitude: ${m.lng}\nDate: ${m.date}`;
        setData(m);
        setModalMessage(message);
        setModalVisible(true);
      });
    });
  };

  useEffect(() => {
    let isCancelled = false;

    loadMapScript().then(() => {
      if (isCancelled) return;

      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        if (!isCancelled) initializeMap(latitude, longitude);
      });
    });

    return () => {
      isCancelled = true;
    };
  }, [location.state]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {modalVisible && <Modal message={modalMessage} onClose={() => setModalVisible(false)} />}
      <div style={{ 
          position: 'absolute', 
          top: '20px', 
          right: '20px', 
          zIndex: 5, 
          backgroundColor: 'white', 
          padding: '10px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#FF6347', marginRight: '10px' }}></div>
          <div>토마토</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#10A24D', marginRight: '10px' }}></div>
          <div>오이</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: 'blue', marginRight: '10px' }}></div>
          <div>고추</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: 'red', marginRight: '10px' }}></div>
          <div>딸기</div>
        </div>
      </div>
      <button onClick={goBack} style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 5
      }}>
      </button>
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default MapComponent;