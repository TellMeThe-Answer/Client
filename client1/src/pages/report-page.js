import React, { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { BottomNavbar, BigTitle, BigBtn } from '../components/components';
import '../css/App.css';
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
  ];
  const allDiseaseOptions = {
    crop1: [
      { value: 'disease1', label: 'Disease 1 for Crop 1' },
      { value: 'disease2', label: 'Disease 2 for Crop 1' },
    ],
    crop2: [
      { value: 'disease3', label: 'Disease 1 for Crop 2' },
      { value: 'disease4', label: 'Disease 2 for Crop 2' },
    ],
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const imageRef = useRef(null);
  let cropper;

  const navigate = useNavigate(); // Use the useNavigate hook

  useEffect(() => {
    if (selectedImage) {
      cropper = new Cropper(imageRef.current, {
        aspectRatio: 16 / 9,
        crop(event) {
          console.log(event.detail);
        },
      });
    }
    return () => {
      if (cropper) {
        cropper.destroy();
      }
    };
  }, [selectedImage]);

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
    if (!selectedImage || !userInput.crop || !userInput.disease) {
      alert("Please upload an image and select both crop and disease!");
      return;
    }

    alert("Report Submitted:\n" + JSON.stringify(userInput, null, 2));
    navigate('/map-page'); // Navigate to the map page after submitting
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target.result;
        setSelectedImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      <div style={{ padding: "40px" }}>
        <BigTitle ttl="신고하기" />
        <p>이미지 업로드</p>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {selectedImage && (
          <div>
            <h3>Selected Image:</h3>
            <img ref={imageRef} src={selectedImage} alt="Selected" width="300" />
          </div>
        )}
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <label>작물: </label>
          <Select
            name="crop"
            options={cropOptions}
            onChange={handleCropChange}
            theme={(theme) => ({
              ...theme,
              borderRadius: 2,
              colors: {
                ...theme.colors,
                primary: '#33490B',
              },
            })}
          />
        </div>
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <label>병해 종류: </label>
          <Select
            name="disease"
            options={diseaseOptions}
            onChange={handleDiseaseChange}
            isDisabled={!userInput.crop}
          />
        </div>
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <label>Symptoms: </label>
          <textarea
            name="symptoms"
            value={userInput.symptoms}
            onChange={handleInputChange}
            rows="4"
            cols="50"
          ></textarea>
        </div>
        <div id="map__kakao" style={{ width: '100%', height: '35vh', margin: '0 auto', marginTop: '20px' }}></div>
        <BigBtn ttl="신고하기" onClick={handleReportSubmit} style={{marginTop: '20px'}} />
      </div>
      <BottomNavbar />
    </div>
  );
};

export default ReportPage;