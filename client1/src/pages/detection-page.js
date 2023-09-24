import React, { useState } from 'react';

const DetectionPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // 첫 번째 선택한 파일 가져오기
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target.result; // 이미지를 데이터 URL로 변환
        setSelectedImage(imageDataUrl);
      };
      reader.readAsDataURL(file); // 파일을 데이터 URL로 읽기
    }
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div>
          <h2>Selected Image:</h2>
          <img src={selectedImage} alt="Selected" width="300" />
        </div>
      )}
    </div>
  );
};

export default DetectionPage;
