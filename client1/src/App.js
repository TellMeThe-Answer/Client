import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/login-page';
import MenuPage from './pages/menu-page';
import DetectionPage from './pages/detection-page';
import MapPage from './pages/map-page';
import DictionaryPage from './pages/dictionary-page';
import MonthPage from './pages/month-page';
import BottomNavBar from './pages/BottomNavBar'; 
import ReportPage from './pages/report-page';
import DetailPage from './pages/detail-page';
import './App.css';

// 새로운 컴포넌트 생성
function Layout() {
  const location = useLocation();
  const showNavBar = location.pathname !== "/";
  return (
    <div style={{ paddingBottom: '50px' }}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/menu-page" element={<MenuPage />} />
        <Route path="/detection-page" element={<DetectionPage />} />
        <Route path="/map-page" element={<MapPage />} />
        <Route path="/dictionary-page" element={<DictionaryPage />} />
        <Route path="/month-page" element={<MonthPage />} />
        <Route path="/report-page" element={<ReportPage />} />
        <Route path="/detail-page" element={<DetailPage />} />
        
      </Routes>
      {showNavBar && <BottomNavBar />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout /> {/* Layout 컴포넌트 렌더링 */}
    </Router>
  );
}

export default App;