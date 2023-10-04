import React, { useEffect, useState } from 'react';
import '../css/App.css';
import { BottomNavbar } from '../components/components';
import Select from 'react-select';

const ReportPage = () => {
  const [userInput, setUserInput] = useState({
    crop: null,
    disease: null,
    symptoms: '',
  });

  const [diseaseOptions, setDiseaseOptions] = useState([]);

  const cropOptions = [
    { value: 'crop1', label: 'Crop 1' },
    { value: 'crop2', label: 'Crop 2' },
    // Add other crops here...
  ];

  const allDiseaseOptions = {
    crop1: [
      { value: 'disease1', label: 'Disease 1 for Crop 1' },
      { value: 'disease2', label: 'Disease 2 for Crop 1' },
      // Add other diseases here...
    ],
    crop2: [
      { value: 'disease3', label: 'Disease 1 for Crop 2' },
      { value: 'disease4', label: 'Disease 2 for Crop 2' },
      // Add other diseases here...
    ],
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const container = document.getElementById('map__kakao');
          const options = {
            center: new window.kakao.maps.LatLng(userLat, userLng),
            level: 3,
          };
          const map = new window.kakao.maps.Map(container, options);

          const markerPosition = new window.kakao.maps.LatLng(userLat, userLng);
          const marker = new window.kakao.maps.Marker({ position: markerPosition });

          marker.setMap(map);
        });
      });
    };
  }, []);

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
    // Handling the report submit. This can be sending the data to a server.
    alert("Report Submitted:\n" + JSON.stringify(userInput, null, 2));
  };

  return (
    <div>
      <div style={{ padding: "40px" }}>
        <h1>Report Page</h1>
        <div style={{ marginBottom: '20px' }}>
          <label>Crop: </label>
          <Select
            name="crop"
            options={cropOptions}
            onChange={handleCropChange}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Disease: </label>
          <Select
            name="disease"
            options={diseaseOptions}
            onChange={handleDiseaseChange}
            isDisabled={!userInput.crop}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Symptoms: </label>
          <textarea
            name="symptoms"
            value={userInput.symptoms}
            onChange={handleInputChange}
          />
        </div>
        {/* Reduce the map size to 75% of the width and height */}
        <div id="map__kakao" style={{ width: '75%', height: '35vh', margin: '0 auto' }}></div>
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => alert('Report Submitted!')} style={{ padding: '10px 20px', fontSize: '16px' }}>
            Report
          </button>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default ReportPage;
