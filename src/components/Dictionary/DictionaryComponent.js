import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import MoveBackComponent from '../common/MoveBackComponent';
import xml2js from 'xml2js';

const removeHyphens = (str) => str.replace(/-/g, '');

const Modal = ({ isOpen, onClose, disease }) => {
  const [diseaseDetail, setDiseaseDetail] = useState(null);

  useEffect(() => {
    // 모달이 열리면 body 스크롤을 비활성화
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    // 컴포넌트가 언마운트되거나 업데이트 되기 전에 스크롤을 복원
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const fetchDiseaseDetail = async () => {
      if (!disease || !isOpen) return;
  
      try {
        const params = {
          serviceCode: 'SVC05',
          apiKey: '202389033d01e9a4d596531416fc83c32132',
          sickKey: disease.sickKey,
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
          console.error("Invalid data structure for disease with sickKey:", disease.sickKey);
          setDiseaseDetail(null);
        }
      } catch (err) {
        console.error("Error fetching detail for disease", disease);
      }
    };
  
    fetchDiseaseDetail();
  }, [disease, isOpen]);
  

  // HTML 문자열을 안전하게 JSX로 변환하는 함수
  const renderHTML = (rawHTML) => React.createElement("div", {
    dangerouslySetInnerHTML: { __html: rawHTML },
    className: "modal-section" // 추가된 클래스 이름
  });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {diseaseDetail ? (
          <>
            <h2 style={{
              fontSize: '20px',
              marginTop: '0',
              marginBottom: '20px', // 여기에 마진 추가
              paddingTop: '0',
              paddingBottom: '0'
            }}>
              {diseaseDetail.sickNameKor} ({diseaseDetail.sickNameEng})
            </h2>
            <div className="modal-section">
              <strong>발생생태:</strong> {renderHTML(diseaseDetail.developmentCondition)}
            </div>
            <div className="modal-section">
              <strong>병 증상:</strong> {renderHTML(diseaseDetail.symptoms)}
            </div>
            <div className="modal-section">
              <strong>방제방법:</strong> {renderHTML(diseaseDetail.preventionMethod)}
            </div>
          </>
        ) : (
          <p>병 상세 정보를 불러오는 중...</p>
        )}
      </div>
    </div>
  );
};

const DictionaryComponent = () => {
  const { cropName } = useParams();
  const [diseaseList, setDiseaseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState(null);

  useEffect(() => {
    const fetchDiseaseData = async () => {
        console.log(cropName);
      try {
        const params = {
          serviceCode: 'SVC01',
          apiKey: '202389033d01e9a4d596531416fc83c32132',
          serviceType: 'AA003',
          cropName,
          displayCount: 10,
          startPoint: 1
        };
        const response = await axios.get('/npmsAPI/service', { params });
        if (response.data && response.data.service && Array.isArray(response.data.service.list)) {
          setDiseaseList(response.data.service.list);
        } else {
          console.error("Invalid data structure for", cropName);
          setDiseaseList([]);
        }
      } catch (err) {
        console.error("Error fetching data for", cropName);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (cropName) {
      fetchDiseaseData();
    }
  }, [cropName]);

  const goBack = () => {
    window.history.back();
  };

  const openModal = (disease) => {
    setSelectedDisease(disease);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDisease(null);
  };

  return (
    <div>
      <MoveBackComponent/>
      <div className="overflow-auto">

        {isLoading && <div className = "w-full h-full flex justify-center items-center"><HashLoader/></div>}
        {error && <p>Error: {error.message}</p>}

        {diseaseList.length > 0 ? (
          <div className = "overflow-auto">
                <div class="px-10 bg-gray-50">
                    <div class="grid grid-cols-2 gap-4 bg-gray-50">

                        <div className="overflow-auto">
                        {diseaseList.map((disease, index) => (
                            (index % 2 === 1) && (
                            <div key={index} className="active:bg-[#c6f8e7] flex flex-col bg-white p-4 rounded-xl mt-4 items-center transition duration-300 ease-in-out" onClick={() => openModal(disease)}>
                                <div className = "w-28 h-28">
                                    <img src={disease.thumbImg} className = "w-full h-full" alt={`${disease.sickNameKor} thumbnail`} />
                                </div>
                                <div className = "font-semibold pt-2">{disease.sickNameKor}</div>
                            </div>
                            )))}
                        </div>

                        <div className = "overflow-auto">
                        {diseaseList.map((disease, index) => (
                            (index % 2 === 0) && (
                            <div key={index} className=" active:bg-[#c6f8e7] flex flex-col bg-white p-4 rounded-2xl mt-4 items-center justify-center transition duration-300 ease-in-out" onClick={() => openModal(disease)}>
                                <div className = "w-28 h-28">
                                <img src={disease.thumbImg} className = "w-full h-full object-contain" alt={`${disease.sickNameKor} thumbnail`} />
                                </div>
                                <div className = "font-semibold pt-2">{disease.sickNameKor}</div>
                            </div>
                            )))}
                        </div>

                    </div>
                </div>
          </div>
        ) : (
          !isLoading && <p>병해 정보를 찾을 수 없습니다.</p>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} disease={selectedDisease || {}} />
    </div>
  );
};

export default DictionaryComponent;