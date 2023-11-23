import React, { useEffect, useState } from 'react';
import '../css/App.css';
import { BigTitle } from "../components/components";
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// 병해 현황을 신고하는 페이지 컴포넌트
const ReportAddressPage = () => {
  const navigate = useNavigate();
  
  // 지도, 마커, 인포윈도우, 주소 상태를 관리
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [address, setAddress] = useState('위치를 불러오는 중...');
  
  // 컴포넌트가 마운트될 때 실행되는 useEffect
  useEffect(() => {
    // 카카오 지도 스크립트를 동적으로 로드
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&libraries=services&autoload=false`;
    document.head.appendChild(script);

    // 스크립트 로드 완료 시
    script.onload = () => {
      window.kakao.maps.load(() => {
        let initialLat, initialLng;
        // 사용자의 현재 위치를 가져오기
        navigator.geolocation.getCurrentPosition((position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          // 카카오 지도를 생성하고 페이지에 표시
          const container = document.getElementById('map__kakao');
          const options = {
            center: new window.kakao.maps.LatLng(userLat, userLng),
            level: 3,
          };
          const createdMap = new window.kakao.maps.Map(container, options);

          // 마커 생성 및 설정
          const markerPosition = new window.kakao.maps.LatLng(userLat, userLng);
          const createdMarker = new window.kakao.maps.Marker({
            position: markerPosition,
            draggable: true,
          });
          createdMarker.setMap(createdMap);
          setMap(createdMap);
          setMarker(createdMarker);
          updateAddress(userLat, userLng);

          // 인포윈도우 생성 및 설정
          const createdInfowindow = new window.kakao.maps.InfoWindow({
            content: '마커를 움직이세요',
            removable: true
          });
          createdInfowindow.open(createdMap, createdMarker);
          setInfowindow(createdInfowindow);
        });
      });
    };
  }, []);

  // 주소 업데이트 함수
  const updateAddress = (lat, lng) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(lng, lat, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setAddress(result[0].address.address_name);
      } else {
        setAddress('주소를 찾을 수 없습니다');
      }
    });
  };

  // 마커와 인포윈도우 상태가 변경될 때 실행되는 useEffect
  useEffect(() => {
    if (marker && infowindow) {
      // 마커 드래그 이벤트 리스너 추가
      window.kakao.maps.event.addListener(marker, 'dragstart', function() {
        infowindow.close();
      });

      window.kakao.maps.event.addListener(marker, 'dragend', function() {
        const position = marker.getPosition();
        updateAddress(position.getLat(), position.getLng());
      });
    }
  }, [marker, infowindow]);

  // 신고하기 버튼 클릭 핸들러
  const handleConfirm = () => {
    const position = marker.getPosition();
    const latlng = {
      lat: position.getLat(),
      lng: position.getLng(),
      address: address
    };

    // 신고 페이지로 이동
    navigate('/report-page', { state: latlng });
  };

  // JSX 반환
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div style={{ padding: "40px" }}>
        <button onClick={() => navigate(-1)} className="goBackButton">
          <FaArrowLeft size={20}/>
        </button>
        <BigTitle ttl="병해 현황 지도" />
        <div id="map__kakao" style={{ width: '100%', height: '90vh' }}></div>
        <div 
          style={{ 
            position: 'absolute', 
            bottom: '50px',
            width: '100%', 
            backgroundColor: 'rgba(255, 255, 255, 0.7)', 
            padding: '25px', 
            textAlign: 'center',
            borderTop: '1px solid #ccc',
            zIndex: 2 
          }}>
          <button onClick={handleConfirm} className="confirmButton">
            이 위치로 신고하기
          </button>
          <p>{address}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportAddressPage;