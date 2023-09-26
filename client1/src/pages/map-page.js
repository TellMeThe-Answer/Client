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
        const container = document.getElementById('map__kakao');
        const options = {
          center: new window.kakao.maps.LatLng(37.549037, 127.075107),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
      });
    };
  }, []);

  return (
    <div>
      <h1>Map Page</h1>
      {/* Other page content and Kakao Map */}
      <div id="map__kakao" style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
};

export default MapPage;
