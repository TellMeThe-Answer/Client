import React, { useState, useEffect } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';
import '../css/App.css';

// HTML 문자열을 React 컴포넌트로 변환하는 함수
const renderHTML = (rawHTML) => React.createElement("div", {
  dangerouslySetInnerHTML: { __html: rawHTML }
});

function MonthPage() {
  const [yearData, setYearData] = useState([]);

  useEffect(() => {
    const fetchYearData = async () => {
      try {
        const response = await axios.get('service/dbyhsCccrrncInfo/dbyhsCccrrncInfoList', {
          params: {
            apiKey: '20231101TLPE50JSLOMU7F7GTWATA',
            // 추가 파라미터가 필요하다면 여기에 추가하세요.
          },
          responseType: 'text'
        });

        xml2js.parseString(response.data, { explicitArray: false }, (err, result) => {
          if (!err) {
            const items = result.response.body.items.item;
            setYearData(Array.isArray(items) ? items : [items]); // 항상 배열로 처리합니다.
          } else {
            console.error('XML parsing error:', err);
          }
        });
        
      } catch (error) {
        // 에러 처리를 여기서 합니다.
      }
    };

    fetchYearData();
  }, []);

  return (
    <div>
      <h1>연도별 발생 정보</h1>
      <ul>
      {yearData.map((item, index) => (
  <li key={index}>
    <p>컨텐츠 번호: {item.cntntsNo}</p>
    <p>년도: {item.pblicteYear}</p>
    <p>컨텐츠 제목: {item.cntntsSj}</p>
    <p>담당자 명: {item.cntntsChargerEsntlNm}</p>
    <p>등록 일시: {item.registDt}</p>
    <p>조회수: {item.cntntsRdcnt}</p>
    <p>파일명: {item.rtnOrginlFileNm}</p>
    <p>파일경로: {item.downFile}</p>
    <p>서비스 등록 일시: {item.svcDtx}</p>
    <p>서비스 등록일: {item.svcDt}</p>
    <p>등록자: {item.updusrEsntlNm}</p>
  </li>
))}

        
      </ul>
    </div>
  );
}

export default MonthPage;