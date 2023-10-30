import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MoveBackComponent from '../../components/common/MoveBackComponent';

const MonthPage = () => {

  const [data,setData] = useState([]);
  
  useEffect(()=>{
    const fetchForecastData = async (crop) => {
      try{
        const params = {
          apiKey: '202389033d01e9a4d596531416fc83c32132',
          serviceCode: 'SVC51',
          serviceType: 'AA003',
        };
        const response = await axios.get('/npmsAPI/service',{params});
        if (response.data && response.data.service && Array.isArray(response.data.service.list)) {
          console.log(response['data']['service']['list']);
          setData(response['data']['service']['list'])
          return response.data.service.list;
        } else {
          console.error("Invalid data structure for", crop);
          return [];
        }
      } catch (err) {
        console.error("Error fetching data for", crop);
        return [];
    }
  };
  fetchForecastData();
},[])
  return(
    <div>
      <MoveBackComponent />
      <h2>이달의 병해예보</h2>
    </div>
  )
}

export default MonthPage;