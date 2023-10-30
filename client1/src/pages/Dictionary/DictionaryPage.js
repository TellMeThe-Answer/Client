import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MoveBackComponent from '../../components/common/MoveBackComponent';
function BigTitle({ ttl }) {
  return <h2>{ttl}</h2>;
}

const crops = [ '딸기', '토마토','오이', '고추', '고구마', '사과'];

const Modal = ({ isOpen, onClose, disease }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-button">X</button>
        <h2>{disease.sickNameKor} ({disease.sickNameEng})</h2>
        <p>작물명: {disease.cropName}</p>
        <p>병 한글명: {disease.sickNameKor}</p>
        {/* 여기에 더 많은 정보를 추가할 수 있습니다. */}
      </div>
    </div>
  );
};

const DictionaryPage = () => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [diseaseList, setDiseaseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState(null);
  
  useEffect(() => {
    const fetchDiseaseData = async (crop) => {
      try {
        const params = {
          serviceCode: 'SVC01',
          apiKey: '202389033d01e9a4d596531416fc83c32132',
          serviceType: 'AA003',
          cropName: crop,
          displayCount: 10,
          startPoint: 1,
        };
  
        const response = await axios.get('/npmsAPI/service', { params });
        if (response.data && response.data.service && Array.isArray(response.data.service.list)) {
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

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (selectedCrop) {
          const data = await fetchDiseaseData(selectedCrop);
          setDiseaseList(data);
        } else {
          setDiseaseList([]);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedCrop]);

  const handleCheckboxChange = (crop) => {
    setSelectedCrop(selectedCrop === crop ? '' : crop);
  };

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
        <BigTitle ttl="병해도감" />
        <div className="checkbox-container">
          {crops.map((crop) => (
            <label key={crop}>
              <input
                type="checkbox"
                checked={selectedCrop === crop}
                onChange={() => handleCheckboxChange(crop)}
              />
              {crop}
            </label>
          ))}
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {diseaseList.length > 0 ? (
          <div className="disease-list">
            {diseaseList.map((disease, index) => (
              <div key={index} className="disease-item" onClick={() => openModal(disease)}>
                <img src={disease.thumbImg} alt={`${disease.sickNameKor} thumbnail`} />
                <h3>{disease.sickNameKor} ({disease.sickNameEng})</h3>
                
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

export default DictionaryPage;