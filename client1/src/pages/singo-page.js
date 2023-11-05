import React from 'react';

const SingoPage = () => {
  // localStorage에서 마커 정보를 읽어옴
  const markers = JSON.parse(localStorage.getItem('markers')) || [];

  return (
    <div>
      <h1>신고된 위치</h1>
      <ul>
        {markers.map((marker, index) => (
          <li key={index}>
            날짜: {marker.date}, 주소: {marker.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingoPage;
