<<<<<<< Updated upstream
import logo from './logo.svg';
import './App.css';
=======
// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "./App.css";
//import MenuPage from './MenuPage';
//import DetectionPage from './DetectionPage';
//import DictionaryPage from './DictionaryPage';
//import MapPage from './MapPage';
//import MonthPage from './MonthPage';
>>>>>>> Stashed changes

function BigTitle({ ttl }) {
  return <h2>{ttl}</h2>;
}

function BigBtn({ ttl }) {
  return (
    <div class="bigBtnArea">
      <button className="bigBtn">{ttl}</button>;
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

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
export {BigTitle};
