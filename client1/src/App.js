// src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login-page';
import MenuPage from './pages/menu-page';
import DetectionPage from './pages/detection-page';
import DictionaryPage from './pages/dictionary-page';
import MapPage from './pages/map-page'; // MapPage 컴포넌트를 임포트합니다.
import MonthPage from './pages/month-page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/menu-page" element={<MenuPage />} />
      <Route path="/detection-page" element={<DetectionPage />} />
      <Route path="/map-page" element={<MapPage />} /> {/* MapPage 컴포넌트를 /map-page 경로에 라우트로 설정합니다. */}
      <Route path="/dictionary-page" element={<DictionaryPage />} />
      <Route path="/month-page" element={<MonthPage />} />
    </Routes>
  );
}

export default App;
