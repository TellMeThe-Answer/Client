// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MenuPage from './MenuPage';
import DetectionPage from './DetectionPage';
import DictionaryPage from './DictionaryPage';
import MapPage from './MapPage';
import MonthPage from './MonthPage';

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
