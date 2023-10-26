import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BigTitle, BottomNavbar } from "../components/components";

function MonthPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const serviceCode = 'SVC51';
    const serviceType = 'AA003';
    fetch(`https://ncpms.rda.go.kr/npmsAPI/service?apiKey=${process.env.REACT_APP_NCPMS_API_KEY}&serviceCode=${serviceCode}&serviceType=${serviceType}`)
    .then((response)=>{
      if(!response.ok){
        throw new Error('ERROR');
      }
      return response.json();
    })
    .then((apiData)=>{
      setData(apiData);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });

    }, []);

  return(
    <div>
    <div style={{ padding: "40px" }}>
      <BigTitle ttl="이달의 병해정보" />
      <ul>
      {data.map((item, index) => (
        <li key={index}>{item.name}</li>
      ))}
      </ul>      
    </div>
    <BottomNavbar />
    </div>
  )
}

export default MonthPage;