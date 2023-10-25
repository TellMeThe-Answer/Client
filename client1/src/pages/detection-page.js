import React, { useState, useEffect, useRef } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { FaArrowLeft } from 'react-icons/fa';

import '../css/App.css'; 

const DetectionPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const imageRef = useRef(null);
  let cropper;
  const [selectedCrop, setSelectedCrop] = useState(null);
  const crops = ["Crop1", "Crop2", "Crop3", "Crop4"];

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

  useEffect(() => {
    if (selectedImage) {
      cropper = new Cropper(imageRef.current, {
        aspectRatio: 16 / 9,
        crop(event) {
          console.log(event.detail.x);
          console.log(event.detail.y);
          console.log(event.detail.width);
          console.log(event.detail.height);
          console.log(event.detail.rotate);
          console.log(event.detail.scaleX);
          console.log(event.detail.scaleY);
        },
      });
    }
    return () => {
      if (cropper) {
        cropper.destroy();
      }
    };
  }, [selectedImage]);

  const goBack = () => {
    window.history.back();
  };

  return (
    <div>
      <button onClick={goBack} className="goBackButton">
        <FaArrowLeft size={20} />
      </button>
      <div style={{ padding: "40px" }}>
        <h1>Image Upload</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '20px 0' }}>
          {crops.map((crop, index) => (
            <div 
              key={index} 
              style={{
                border: '1px solid black',
                padding: '20px',
                textAlign: 'center',
                position: 'relative'
              }}
              onClick={() => setSelectedCrop(index)}
            >
              {crop}
              {selectedCrop === index && (
                <span style={{ position: 'absolute', top: '10px', right: '10px' }}>
                  ✔️
                </span>
              )}
            </div>
          ))}
        </div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {selectedImage && (
          <div>
            <h2>Selected Image:</h2>
            <img ref={imageRef} src={selectedImage} alt="Selected" width="300" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DetectionPage;
