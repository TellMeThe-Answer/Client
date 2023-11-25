import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const cropMarkerImages = {
  'tomato': 'https://cdn1.iconfinder.com/data/icons/color-bold-style/21/14_2-1024.png',
  'cucumber': 'https://cdn3.iconfinder.com/data/icons/flat-pro-basic-set-1-1/32/location-green-1024.png',
  'pepper': 'https://cdn1.iconfinder.com/data/icons/color-bold-style/21/14-1024.png',
  'strawberry': 'https://cdn1.iconfinder.com/data/icons/black-bold-style-1/3/14-1024.png',
};

const MarkerFixPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { reportIndex, reportLat, reportLng, cropType } = location.state || {};

  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState('Loading location...');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(reportLat, reportLng),
          level: 3
        };

        const createdMap = new window.kakao.maps.Map(container, options);
        setMap(createdMap);

        const markerImageUrl = cropMarkerImages[cropType] || 'default_marker_image_url'; // Fallback URL
        const markerImage = new window.kakao.maps.MarkerImage(markerImageUrl, new window.kakao.maps.Size(40, 40));

        const markerPosition = new window.kakao.maps.LatLng(reportLat, reportLng);
        const createdMarker = new window.kakao.maps.Marker({
          position: markerPosition,
          map: createdMap,
          image: markerImage,
          draggable: true,
        });
        setMarker(createdMarker);
        const infowindow = new window.kakao.maps.InfoWindow({
          content: '<div style="padding:5px;">마커를 움직이세요</div>'
        });

        // Display the info window attached to the marker
        infowindow.open(createdMap, createdMarker);
        // Fetch and display the initial address
        updateAddress(reportLat, reportLng);

        window.kakao.maps.event.addListener(createdMarker, 'dragend', function() {
          const newPosition = createdMarker.getPosition();
          updateAddress(newPosition.getLat(), newPosition.getLng());
        });
        window.kakao.maps.event.addListener(createdMarker, 'dragstart', function() {
          infowindow.close();
        });
      });
    };
  }, [reportLat, reportLng, reportIndex, cropType]);

  const updateAddress = (lat, lng) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(lng, lat, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setAddress(result[0].address.address_name);
      } else {
        setAddress('Address not found');
      }
    });
  };

  const handleConfirm = () => {
    if (marker) {
      const position = marker.getPosition();
      const updatedReports = JSON.parse(localStorage.getItem('reports')) || [];
      updatedReports[reportIndex] = {
        ...updatedReports[reportIndex],
        lat: position.getLat(),
        lng: position.getLng(),
        address: address
      };
      localStorage.setItem('reports', JSON.stringify(updatedReports));
    }
    navigate('/reportdetail-page');
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div style={{ padding: '40px' }}>
        <h1>Adjust Marker Location</h1>
        <div id="map" style={{ width: '100%', height: '90vh' }}></div>
        <div style={{
          position: 'absolute',
          bottom: '50px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          padding: '25px',
          textAlign: 'center',
          borderTop: '1px solid #ccc',
          zIndex: 2
        }}>
          <button onClick={handleConfirm} style={{ marginTop: '20px' }}>위치 수정하기</button>
          <p>{address}</p>
        </div>
      </div>
    </div>
  );
};

export default MarkerFixPage;