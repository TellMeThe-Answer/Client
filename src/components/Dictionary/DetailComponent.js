import React, {useState, useEffect} from 'react'; 
import {useRecoilState} from "recoil";
import { detailInfor, selectImage, selectDetail} from '../../config/atom';
import { useNavigate } from "react-router-dom";
import xml2js from 'xml2js';
import axios from 'axios';

const DetailComponent = () =>{

    const [selectedDisease, setSelectedDisease] = useRecoilState(detailInfor);
    const [selectedImage, setSelectedImage] = useRecoilState(selectImage);
    const [diseaseDetail, setDiseaseDetail] = useRecoilState(selectDetail);
    const navigate = useNavigate(); //변수 할당시켜서 사용
    const moveBack = () =>{
        navigate(-1);
    }
    useEffect(() => {
        const fetchDiseaseDetail = async () => {
    
          try {
            const params = {
              serviceCode: 'SVC05',
              apiKey: '202389033d01e9a4d596531416fc83c32132',
              sickKey: selectedDisease.sickKey,
            };
            const response = await axios.get('/npmsAPI/service', { params });
            if (response.data) {
              xml2js.parseString(response.data, (err, result) => {
                if (!err) {
                  // 결과에서 하이픈을 제거합니다. 실제 필드명은 데이터 구조에 따라 달라질 수 있습니다.
                  const detail = result.service;
                  if (detail.developmentCondition && typeof detail.developmentCondition[0] === 'string') {
                    detail.developmentCondition[0] = detail.developmentCondition[0].replace(/-/g, '');
                  }
                  if (detail.symptoms && typeof detail.symptoms[0] === 'string') {
                    detail.symptoms[0] = detail.symptoms[0].replace(/-/g, '');
                  }
                  if (detail.preventionMethod && typeof detail.preventionMethod[0] === 'string') {
                    detail.preventionMethod[0] = detail.preventionMethod[0].replace(/-/g, '');
                  }
                  setDiseaseDetail(detail);
                } else {
                  console.error('Error parsing XML:', err);
                  setDiseaseDetail(null);
                }
              });
            } else {
              console.error("Invalid data structure for disease with sickKey:", selectedDisease.sickKey);
              setDiseaseDetail(null);
            }
          } catch (err) {
            console.error("Error fetching detail for disease", selectedDisease);
          }
        };
      
        fetchDiseaseDetail();
      }, []);

    useEffect(()=>{
        console.log(selectedDisease);
        console.log(selectedImage);
        console.log(diseaseDetail);
    }, [])
    return(
        <> 
            <div className = "h-full w-full">
                <button className = "absolute z-10" onClick={moveBack}>
                    <img src = "https://cdn-icons-png.flaticon.com/128/271/271220.png" className = "w-6 h-6 ml-2 mt-2"/>
                </button>
                <img src = {selectedImage} className = "w-96 h-96"/>

                <div className = "p-5">
                        <div>
                            {diseaseDetail ? (
                            <>
                                <h2 style={{
                                fontSize: '20px',
                                marginTop: '0',
                                marginBottom: '20px', // 여기에 마진 추가
                                paddingTop: '0',
                                paddingBottom: '0'
                                }} className = "border-b border-gray-300 h-12">
                                병해명 : {diseaseDetail.sickNameKor} ({diseaseDetail.sickNameEng})
                                </h2>
                                <div className="modal-section">
                                <strong>발생생태:</strong> {diseaseDetail.developmentCondition}
                                </div>
                                <div className="modal-section">
                                <strong>병 증상:</strong> {diseaseDetail.symptoms}
                                </div>
                                <div className="modal-section">
                                <strong>방제방법:</strong> {diseaseDetail.preventionMethod}
                                </div>
                            </>
                            ) : (
                            <p>병 상세 정보를 불러오는 중...</p>
                            )}
                        </div>
                </div>
            </div>
        </>
    )
}

export default DetailComponent;