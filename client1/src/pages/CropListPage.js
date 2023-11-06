import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BigTitle } from "../components/components";
import { FaArrowLeft } from 'react-icons/fa';
import '../css/App.css';
import xml2js from 'xml2js';
import timers from 'timers-browserify';
import buffer from 'buffer'

const Modal = ({ isOpen, onClose, disease }) => {
  const [diseaseDetail, setDiseaseDetail] = useState(null);

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
              setDiseaseDetail(result);
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
  const renderHTML = (rawHTML) =>
    React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-button">X</button>
        {diseaseDetail ? (
          <>
            <h2>{diseaseDetail.service.sickNameKor} ({diseaseDetail.service.sickNameEng})</h2>
            {/* 기존 데이터 출력 방식을 renderHTML 함수를 사용하여 변환 */}
           
        
            
            <p>병 한문명: {renderHTML(diseaseDetail.service.sickNameChn)}</p>
           
            <p>발생생태: {renderHTML(diseaseDetail.service.developmentCondition)}</p>
            <p>병 증상: {renderHTML(diseaseDetail.service.symptoms)}</p>
            <p>방제방법: {renderHTML(diseaseDetail.service.preventionMethod)}</p>
            
          </>
        ) : (
          <p>병 상세 정보를 불러오는 중...</p>
        )}
      </div>
    </div>
  );
};

const CropListPage = () => {
  const { cropName } = useParams();
  const [diseaseList, setDiseaseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState(null);

  useEffect(() => {
    const fetchDiseaseData = async () => {
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
      <button onClick={goBack} className="goBackButton">
        <FaArrowLeft size={20} />
      </button>
      <div className="container">
        <BigTitle ttl={`병해도감 - ${cropName}`} />
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {diseaseList.length > 0 ? (
          <div className="disease-list">
            {diseaseList.map((disease, index) => (
              <div key={index} className="disease-item" onClick={() => openModal(disease)}>
                <img src={disease.thumbImg} alt={`${disease.sickNameKor} thumbnail`} />
                <h3>{disease.sickNameKor} </h3>
              </div>
            ))}
          </div>
        ) : (
          !isLoading && <p>병해 정보를 찾을 수 없습니다.</p>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} disease={selectedDisease || {}} />
    </div>
  );
};

export default CropListPage;