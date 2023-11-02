import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MoveBackComponent from '../../components/common/MoveBackComponent';
import '../../components/CropList/cropList.css'

const Modal = ({ isOpen, onClose, disease }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-button">X</button>
        <h2>{disease.sickNameKor} ({disease.sickNameEng})</h2>
        <p>작물명: {disease.cropName}</p>
        <p>병 한글명: {disease.sickNameKor}</p>
        <article></article>
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

  var details = {};

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
          console.log(diseaseList);
          for(var i=0;i<diseaseList.length;i++){
            const params2 = {
              serviceCode: 'SVC05',
              apiKey: '202389033d01e9a4d596531416fc83c32132',
              sickKey: diseaseList[i].sickKey
            };
            console.log(diseaseList[i].sickKey)
            const detail = await axios.get('/npmsAPI/service', { params2 });
            details[params.sickKey] = detail
          }
          console.log(details);

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
      <MoveBackComponent />
      <div className="container">
        <h2>{`병해도감 - ${cropName}`}</h2>
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