import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useNavigate, useLocation } from 'react-router-dom';
import { BottomNavbar } from '../components/components';

const ReportPage = () => {
  const [currentAddress, setCurrentAddress] = useState('');
  const [latLng, setLatLng] = useState({ lat: null, lng: null });
  const [userInput, setUserInput] = useState({
    crop: null,
    disease: null,
    symptoms: '',
  });

  const cropOptions = [
    { value: 'crop1', label: '작물 1' },
    { value: 'crop2', label: '작물 2' },
    // 여기에 더 많은 작물 옵션을 추가할 수 있습니다.
  ];

  // 여러 작물에 대한 질병 옵션을 여기에 설정합니다.
  const allDiseaseOptions = {
    crop1: [
      { value: 'disease1', label: '작물 1의 질병 1' },
      { value: 'disease2', label: '작물 1의 질병 2' },
    ],
    crop2: [
      { value: 'disease3', label: '작물 2의 질병 1' },
      { value: 'disease4', label: '작물 2의 질병 2' },
    ],
    // 여기에 더 많은 질병 옵션을 추가할 수 있습니다.
  };

  const [diseaseOptions, setDiseaseOptions] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 만약 위치 상태에 주소가 있다면, 현재 주소와 좌표를 업데이트합니다.
    if (location.state && location.state.address) {
      setCurrentAddress(location.state.address);
      setLatLng({ lat: location.state.lat, lng: location.state.lng });
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleCropChange = (selectedOption) => {
    const selectedCrop = selectedOption ? selectedOption.value : null;
    setUserInput((prevInput) => ({ ...prevInput, crop: selectedCrop, disease: null }));
    setDiseaseOptions(selectedCrop ? allDiseaseOptions[selectedCrop] : []);
  };

  const handleDiseaseChange = (selectedOption) => {
    const selectedDisease = selectedOption ? selectedOption.value : null;
    setUserInput((prevInput) => ({ ...prevInput, disease: selectedDisease }));
  };

  const handleReportSubmit = () => {
    // 사용자 입력 유효성 검사
    if (!userInput.crop || !userInput.disease || !currentAddress) {
      alert('작물, 질병 및 주소를 모두 선택해주세요!');
      return;
    }

    // 신고 데이터에 현재 주소와 좌표 추가
    const reportData = {
      ...userInput,
      address: currentAddress,
      lat: latLng.lat,
      lng: latLng.lng,
    };

    // 기존 신고 가져오기, 새로운 신고 추가, 로컬 스토리지에 저장
    const existingReports = JSON.parse(localStorage.getItem('reports')) || [];
    localStorage.setItem('reports', JSON.stringify([...existingReports, reportData]));

    // 사용자에게 신고가 제출되었다고 알림
    alert('신고가 제출되었습니다:\n' + JSON.stringify(reportData, null, 2));

    // 제출 후 사용자를 map-page로 이동
    navigate('/map-page', { state: { newReport: reportData } });
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      <div style={{ padding: "40px" }}>
        <h1>신고 페이지</h1>
        <div>선택된 주소: {currentAddress}</div>
        <button onClick={() => navigate('/reportaddress-page')}>주소 설정</button>
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <label>작물: </label>
          <Select
            name="crop"
            options={cropOptions}
            onChange={handleCropChange}
            value={cropOptions.find(option => option.value === userInput.crop)}
          />
        </div>
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <label>질병: </label>
          <Select
            name="disease"
            options={diseaseOptions}
            onChange={handleDiseaseChange}
            value={diseaseOptions.find(option => option.value === userInput.disease)}
            isDisabled={!userInput.crop}
          />
        </div>
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <label>증상: </label>
          <textarea
            name="symptoms"
            value={userInput.symptoms}
            onChange={handleInputChange}
            rows="4"
            cols="50"
          ></textarea>
        </div>
        <button onClick={handleReportSubmit} style={{ marginTop: '20px' }}>신고 제출</button>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default ReportPage;
