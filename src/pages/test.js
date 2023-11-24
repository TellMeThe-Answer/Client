import React, { useState } from 'react';
import data from '../config/forcast.json';
import './test.css'

const MonthPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [crops, setCrops] = useState({});
  const [openDiseaseIndex, setOpenDiseaseIndex] = useState(null); // To track which crop's diseases are displayed

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
    const monthData = data[month];
    const combinedCrops = {
      ...monthData.예보.reduce((acc, crop) => ({ ...acc, [crop.작물]: { ...crop, type: '예보' } }), {}),
      ...monthData.주의보.reduce((acc, crop) => ({ ...acc, [crop.작물]: { ...crop, type: '주의보' } }), {})
    };
    setCrops(combinedCrops);
    setOpenDiseaseIndex(null); // Reset the open diseases
  };

  const handleCropClick = (index) => {
    // Toggle the display of the diseases for the selected crop
    setOpenDiseaseIndex(openDiseaseIndex === index ? null : index);
  };

  return (
    <div className="month-page">
      <div className="calendar-grid">
        {Object.keys(data).map((month, index) => (
          <button
            key={index}
            onClick={() => handleMonthClick(month)}
            className={selectedMonth === month ? 'selected' : ''}
          >
            {month}
          </button>
        ))}
      </div>

      {selectedMonth && <h1>{selectedMonth}의 작물</h1>}
      <div className="crops-list">
        {Object.entries(crops).map(([cropName, cropDetails], index) => (
          <React.Fragment key={index}>
            <button
              onClick={() => handleCropClick(index)}
              className="crop-button"
            >
              {cropName}
            </button>
            {openDiseaseIndex === index && (
              <div className="diseases-list">
                {cropDetails.질병.map((disease, diseaseIndex) => (
                 <button key={diseaseIndex} className="disease-button">
                 <span className={`circle ${cropDetails.type === '예보' ? 'advisory' : 'warning'}`}></span>
                 {disease}
               </button>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
    </div>
  );
};

export default MonthPage;