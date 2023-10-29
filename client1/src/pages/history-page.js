import React from 'react';
import { BigTitle } from "../components/components";
import { FaArrowLeft } from 'react-icons/fa';
import '../css/App.css'; 

const HistoryPage = () => {
  const goBack = () => {
      window.history.back(); 
  }

  return (
      <div>
          <button onClick={goBack} className="goBackButton">
              <FaArrowLeft size={20}/>
          </button>
          <div className="container">
              <BigTitle ttl="히스토리 페이지" />
          </div>
      </div>
  );
};

export default HistoryPage;
