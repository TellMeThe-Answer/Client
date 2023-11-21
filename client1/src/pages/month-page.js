import React, { useState } from 'react';

// JSON 데이터를 가져오는 가정
import data from './jsonlist.json';

const MonthPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [crops, setCrops] = useState([]);

  const handleMonthClick = (month) => {
    // 해당 월의 작물 데이터를 설정
    setSelectedMonth(month);
    const monthData = data[month];
    setCrops(monthData.Forecast);
  };

  return (
    <div className="calendar">
      {['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'].map((month) => (
        <button key={month} onClick={() => handleMonthClick(month)}>
          {month}
        </button>
      ))}
      {selectedMonth && <h1>{selectedMonth}의 작물</h1>}
      <div className="crops-list">
        {crops.map((crop) => (
          <div key={crop.Crop}>
            <h2>{crop.Crop}</h2>
            {crop.disease.map((disease) => (
              <p key={disease}>
                <span className={`circle ${disease.type === 'Advisory' ? 'yellow' : 'green'}`}></span>
                {disease.name}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};




export default MonthPage;