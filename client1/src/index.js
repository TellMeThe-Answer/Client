// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App'
//import MenuPage from './pages/menu-page'; // MenuPage 컴포넌트 파일 경로
//import DetectionPage from './pages/detection-page'; // DetectionPage 컴포넌트 파일 경로
//import MapPage from './pages/map-page'; // MapPage 컴포넌트 파일 경로
//import DictionaryPage from './pages/dictionary-page'; // DictionaryPage 컴포넌트 파일 경로
//import MonthPage from './pages/month-page'; // MonthPage 컴포넌트 파일 경로

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);