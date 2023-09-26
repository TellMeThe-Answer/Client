import logo from "./logo.svg";
import "./App.css";
// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login-page";
//import MenuPage from './MenuPage';
//import DetectionPage from './DetectionPage';
//import DictionaryPage from './DictionaryPage';
//import MapPage from './MapPage';
//import MonthPage from './MonthPage';

function BigTitle({ ttl }) {
  return <h2>{ttl}</h2>;
}

function BigBtn({ ttl, type, onClick }) {
  return (
    <div class="bigBtnArea">
      <button type={type} className="bigBtn" onClick={onClick}>{ttl}</button>
    </div>
  );
}

function MenuBtn({ color, ttl }) {
  const buttonClass = `${color} menuBtn`;
  return (
    <div class="menuBtnArea">
      <button className={buttonClass}>{ttl}</button>
    </div>
  );
}

function EmptyArea() {
  return(
    <div className="empty-area">
      
    </div>
  );
}

export { BigTitle, BigBtn, EmptyArea };
