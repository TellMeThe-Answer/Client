import "../css/App.css";
import "../css/nav-bar.css"
import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope, faMapLocationDot, faHouse, faBook, faFlag, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons"

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

const BottomNavbar = () => {
  return(
    <nav class="nav">
      <ul class="nav-list">
        <li>
          <Link to="/detection-page">
          <FontAwesomeIcon icon={faStethoscope} />
          </Link>
        </li>
        <li>
          <Link to="/map-page">
          <FontAwesomeIcon icon={faMapLocationDot} />
          </Link>
        </li>
        <li>
          <Link to="/month-page">
          <FontAwesomeIcon icon={faHouse} />
          </Link>
        </li>
        <li>
          <Link to="/dictionary-page">
          <FontAwesomeIcon icon={faBook} />
          </Link>
        </li>
        <li>
          <Link to="/report-page">
          <FontAwesomeIcon icon={faFlag} />
          </Link>
        </li>
        <li>
          <Link to="/history-page">
          <FontAwesomeIcon icon={faClockRotateLeft} />
          </Link>
        </li>
      </ul>
    </nav>
  )
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

export { BigTitle, BigBtn, EmptyArea, BottomNavbar };
