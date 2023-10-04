import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/App'; // Don't forget to create this file and add your styles

const BottomNavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="bottom-nav-bar">
      <button onClick={() => navigate('/detection-page')}>진단</button>
      <button onClick={() => navigate('/map-page')}>지도</button>
      <button onClick={() => navigate('/dictionary-page')}>도감</button>
      <button onClick={() => navigate('/month-page')}>이달의 병해정보</button>
      <button onClick={() => navigate('/report-page')}>Report</button>
      <button onClick={() => navigate('/detail-page')}>Detail</button>
    </div>
   
  );
};

export default BottomNavBar;
