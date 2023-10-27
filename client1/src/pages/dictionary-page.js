import React from 'react';
import { BigTitle } from "../components/components";
import { FaArrowLeft } from 'react-icons/fa';

import '../css/App.css'; 
const DictionaryPage = () => {
  const goBack = () => {
      window.history.back(); 
  }

  return (
      <div>
          <button onClick={goBack} className="goBackButton">
              <FaArrowLeft size={20}/>
          </button>
          <div className="container">
              <BigTitle ttl="병해도감" />
          </div>
      </div>
  );
};

export default DictionaryPage;