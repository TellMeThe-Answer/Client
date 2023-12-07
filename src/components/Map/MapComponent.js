import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import markerData from '../../config/markerData.json'
import axios from "axios";

const MapComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [data, setData] = useState();
  const [markerData, setMarkerData] = useState(null);


  const fetchData = async () => {
    try {
      const response = await axios.get('/report/list/all', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('GET 요청 성공:', response.data.reportListDtoList);
      setMarkerData(response.data.reportListDtoList);
    } catch (error) {
      console.error('GET 요청 실패:', error.response.data.message);
    }
  };

  useEffect(() => {

    fetchData();
  }, []);


  const Modal = ({ message, onClose }) => {
    // 모달 바깥 부분을 클릭했을 때 닫기
    const handleOutsideClick = (e) => {
      if (e.target.className === 'modal') {
        onClose();
      }
    };
    return (
      <div className="modal" onClick={handleOutsideClick}>
       <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-md w-72 h-1/2 flex flex-col items-center justify-center">
          {data && data.imageLink && data.imageLink[0] ? (
            <img src={data.imageLink[0].imageLink} alt='image' className='w-60 h-60' />
          ) : (
            <img src='images/logo.png' alt='기본 이미지' className='w-60 h-60' />
          )}
          <div className="mt-4 w-full pl-7">
            <div className="text-lg font-bold">작물 : {data.crop}</div>
            <div className="text-lg mt-2">날짜 : {data.createDate}</div>
            <div className="text-lg">질병 : {data.disease}</div>
            <div className="text-lg">본문 : {data.content}</div>
          </div>
        </div>

      </div>
    );
  };

  // 작물별 마커 이미지 경로
  const cropMarkerImages = {
    '토마토': 'images/tomato_marker.png',
    '오이': 'images/cucumber_marker.png',
    '고추': 'images/pepper_marker.png',
    '딸기': 'images/strawberry_marker.png',
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
    initailizeMarker(latitude, longitude, createdMap);
  };

  // 저장된 마커 로드 
  const initailizeMarker = (latitude, longitude, createdMap) => {

    if (markerData) {
      markerData.forEach((m) => {
        const position = new window.kakao.maps.LatLng(m.latitude, m.longitude);
        const imageSrc = cropMarkerImages[m.crop] || 'images/tomato_marker.png';
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, new window.kakao.maps.Size(40, 40));
        const marker = new window.kakao.maps.Marker({
          position: position,
          map: createdMap,
          title: '신고된 위치',
          image: markerImage,
        });

        window.kakao.maps.event.addListener(marker, 'click', () => {
          const message = `Marker Details:\nLatitude: ${m.latitude}\nLongitude: ${m.longitude}\nDate: ${m.createDate}`;
          setData(m);
          setModalMessage(message);
          setModalVisible(true);
        });
      });
    }
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
  }, [location.state, markerData]);


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
          <div style={{ width: '20px', height: '20px', backgroundColor: '#DD1818', marginRight: '10px' }}></div>
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
          <div style={{ width: '20px', height: '20px', backgroundColor: '#FF6347', marginRight: '10px' }}></div>
          <div>딸기</div>
        </div>
      </div>

      <div id="map" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default MapComponent;