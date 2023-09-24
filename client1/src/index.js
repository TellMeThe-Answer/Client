// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login-page'; // LoginPage 컴포넌트 파일 경로
import MenuPage from './pages/menu-page'; // MenuPage 컴포넌트 파일 경로
import DetectionPage from './pages/detection-page'; // DetectionPage 컴포넌트 파일 경로
import MapPage from './pages/map-page'; // MapPage 컴포넌트 파일 경로
import DictionaryPage from './pages/dictionary-page'; // DictionaryPage 컴포넌트 파일 경로
import MonthPage from './pages/month-page'; // MonthPage 컴포넌트 파일 경로

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/menu-page" element={<MenuPage />} />
      <Route path="/detection-page" element={<DetectionPage />} />
      <Route path="/map-page" element={<MapPage />} />
      <Route path="/dictionary-page" element={<DictionaryPage />} />
      <Route path="/month-page" element={<MonthPage />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
