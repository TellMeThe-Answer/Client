import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/App.css'; 

const BottomNavBar = () => {
  const navigate = useNavigate();

  // 함수로 분리하여 코드의 중복을 줄입니다.
  const navigateTo = (path, label) => () => {
    console.log(`Navigating to ${label}`); // 로깅을 통해 어떤 버튼이 클릭되었는지 확인합니다.
    navigate(path);
  }

  return (
    <div className="bottom-nav-bar">
      <nav aria-label="Main"> {/* 접근성을 위해 navigation landmark와 aria-label 추가 */}
        {/* 각 버튼을 클릭했을 때 navigateTo 함수를 호출합니다. */}
        <button onClick={navigateTo('/detection-page', '진단')} aria-label="Go to Diagnosis Page">진단</button>
        <button onClick={navigateTo('/map-page', '지도')} aria-label="Go to Map Page">지도</button>
        <button onClick={navigateTo('/dictionary-page', '도감')} aria-label="Go to Dictionary Page">도감</button>
        <button onClick={navigateTo('/month-page', '이달의 병해정보')} aria-label="Go to Monthly Pest Information Page">이달의 병해정보</button>
        <button onClick={navigateTo('/my-page', '마이 페이지')} aria-label="Go to My Page">마이 페이지</button>
        
      </nav>
    </div>
  );
};

export default BottomNavBar;
