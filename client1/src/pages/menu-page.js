import React from 'react';
import { useNavigate } from 'react-router-dom';

const MenuPage = () => {
  const navigate = useNavigate();

  const goToDetectionPage = () => {
    navigate('/detection-page');
  };

  const goToMapPage = () => {
    navigate('/map-page');
  };

  const goToDictionaryPage = () => {
    navigate('/dictionary-page');
  };

  const goToMonthPage = () => {
    navigate('/month-page');
  };

  return (
    <div style={{ padding: '50px' }}>
      <h2>Menu Page</h2>
      <button onClick={goToDetectionPage}>진단</button>
      <button onClick={goToMapPage}>지도</button>
      <button onClick={goToDictionaryPage}>도감</button>
      <button onClick={goToMonthPage}>이달의 병해정보</button>
    </div>
  );
};

export default MenuPage;
