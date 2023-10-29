import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BigTitle, BottomNavbar } from "../components/components";
import { saveAs } from 'file-saver';
import axios from 'axios';
function MonthPage() {
  const [data, setData] = useState([]);
  
  const serviceCode = 'SVC01';
  const serviceType = 'AA003';
  const cropName= '감자';
  const encoded = decodeURIComponent(cropName)
  const urlstring = `http://ncpms.rda.go.kr/npmsAPI/service?serviceCode=${serviceCode}&apiKey=${process.env.REACT_APP_NCPMS_API_KEY}&serviceType=${serviceType}&cropName=${encoded}`
  const onClickSession = async (e) => {
    try {
        const response = await axios.get(`?serviceCode=${serviceCode}&apiKey=${process.env.REACT_APP_NCPMS_API_KEY}&serviceType=${serviceType}&cropName=${cropName}`);
   
        console.log(response);
       
      } catch (err) {
        console.log(err)
      }


  }
  /*
  useEffect(async ()=>{
    try{
      const response = await axios.get('?serviceCode=SVC01&apiKey=202389033d01e9a4d596531416fc83c32132&serviceType=AA003&cropName=감자');
      console.log(response);
    }catch(err){
      console.log(err)
    }
  },[]);
  
  */
  return (
  <div>
  <div style={{ padding: "40px" }}>
    <BigTitle ttl="이달의 병해정보" />
    <button onClick={onClickSession}>connect</button>
    <ul>
    </ul>      
  </div>
  <BottomNavbar />
  </div>

);
}

export default MonthPage;