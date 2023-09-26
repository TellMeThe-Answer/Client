import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login-page'; // LoginPage component file path
import MenuPage from './pages/menu-page'; // MenuPage component file path
import DetectionPage from './pages/detection-page'; // DetectionPage component file path
import MapPage from './pages/map-page'; // MapPage component file path
import DictionaryPage from './pages/dictionary-page'; // DictionaryPage component file path
import MonthPage from './pages/month-page'; // MonthPage component file path

// Get the 'root' DOM element
const root = document.getElementById('root');

// Create a root and render the application using the new `createRoot` API
ReactDOM.createRoot(root).render(
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/menu-page" element={<MenuPage />} />
      <Route path="/detection-page" element={<DetectionPage />} />
      <Route path="/map-page" element={<MapPage />} />
      <Route path="/dictionary-page" element={<DictionaryPage />} />
      <Route path="/month-page" element={<MonthPage />} />
    </Routes>
  </Router>
);
