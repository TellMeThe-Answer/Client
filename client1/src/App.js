// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login-page'; // Import LoginPage component
import MenuPage from './pages/menu-page'; // Import MenuPage component
import DetectionPage from './pages/detection-page'; // Import DetectionPage component
import DictionaryPage from './pages/dictionary-page'; // Import DictionaryPage component
import MapPage from './pages/map-page'; // Import MapPage component
import MonthPage from './pages/month-page'; // Import MonthPage component

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/menu-page" element={<MenuPage />} />
      <Route path="/detection-page" element={<DetectionPage />} />
      <Route path="/map-page" element={<MapPage />} />
      <Route path="/dictionary-page" element={<DictionaryPage />} />
      <Route path="/month-page" element={<MonthPage />} />
    </Routes>
  );
}

export default App;
