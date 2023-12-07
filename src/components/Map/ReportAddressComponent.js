import React, { useEffect, useState } from 'react';
import '../common/common.css'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


//주소 reportpage로 보내줌
const ReportAddressComponent = () => {
  const navigate = useNavigate();
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [infowindow, setInfowindow] = useState(null); // 인포윈도우 상태 추가
  const [address, setAddress] = useState('위치를 불러오는 중...');

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&libraries=services`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          const container = document.getElementById('map__kakao');
          const options = {
            center: new window.kakao.maps.LatLng(userLat, userLng),
            level: 3,
          };
          const createdMap = new window.kakao.maps.Map(container, options);

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
            content: '마커를 움직이세요', // 인포윈도우에 표시할 내용
            removable: true
          });
          createdInfowindow.open(createdMap, createdMarker); // 마커에 인포윈도우를 표시
          setInfowindow(createdInfowindow); // 인포윈도우 상태 설정
        });
      });
    };
  }, []);

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

  useEffect(() => {
    if (marker && infowindow) {
      window.kakao.maps.event.addListener(marker, 'dragstart', function() {
        // 드래그 시작 시 인포윈도우 닫기
        infowindow.close();
      });

      window.kakao.maps.event.addListener(marker, 'dragend', function() {
        const position = marker.getPosition();
        updateAddress(position.getLat(), position.getLng());
      });
    }
  }, [marker, infowindow]);

  const handleConfirm = () => {
    const position = marker.getPosition();
    const latlng = {
      lat: position.getLat(),
      lng: position.getLng(),
      address: address
    };

    navigate('/report-page', { state: latlng });
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div style={{ padding: "40px" }}>
        <button onClick={() => navigate(-1)} className="goBackButton">
          <FaArrowLeft size={20}/>
        </button>
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

export default ReportAddressComponent;