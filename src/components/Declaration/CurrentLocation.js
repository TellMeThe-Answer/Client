import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {mapLocation} from "../../config/atom";
import {useRecoilState} from "recoil";

const CurrentLocation = () => {
  const navigate = useNavigate();
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useRecoilState(mapLocation);
  const [infoWindow, setInfoWindow] = useState(null);

  useEffect(() => {

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=b2bdb158d7882941fc4f09c8bf916c6c&libraries=services&autoload=false`;
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

          {/**const iwContent = `<div class="marker-infowindow">${address}</div>`*/}
          const iwContent = '<div class="marker-infowindow">마커를 이동하세요</div>'
          const createdInfoWindow = new window.kakao.maps.InfoWindow({
            position: markerPosition,
            content: iwContent
          });

          createdInfoWindow.open(createdMap, createdMarker);
          setInfoWindow(createdInfoWindow);
        });
      });
    };
  }, []);

  useEffect(() => {
    if (marker && infoWindow) {
        window.kakao.maps.event.addListener(marker, 'dragstart', function() {
        infoWindow.close();
      });
      
      window.kakao.maps.event.addListener(marker, 'dragend', function() {
        const position = marker.getPosition();
        updateAddress(position.getLat(), position.getLng());
      });
    }
    
  }, [marker, infoWindow]);


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

  const handleConfirm = () => {
    alert('주소가 확인되었습니다.');
    navigate('/report-page', { state: { address: address } });
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <div>
            <h2 ttl="병해 현황 지도" />
            <div id="map__kakao" style={{ width: '100%', height: '90vh' }}>
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
                    <button onClick={handleConfirm} className="apple-style-button">확인하기</button>
                    <div className="apple-style-address">
                        주소: {address}
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default CurrentLocation;