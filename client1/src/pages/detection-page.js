import React, { useState, useEffect, useRef } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css'; // CropperJS의 스타일을 임포트합니다.
import { BigTitle, BottomNavbar } from '../components/components';
const DetectionPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const imageRef = useRef(null); // image element에 대한 참조를 생성합니다.
  let cropper;

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
      // 이미지가 선택되면 cropper 인스턴스를 생성합니다.
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
      // 컴포넌트가 언마운트되면 cropper 인스턴스를 제거합니다.
      if (cropper) {
        cropper.destroy();
      }
    };
  }, [selectedImage]); // selectedImage가 변경될 때마다 effect를 실행합니다.

  return (
    <div>
    <div style={{ padding: "40px" }}>
      <BigTitle ttl="병해 진단하기" />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div>
          <h2>Selected Image:</h2>
          {/* 이미지 참조를 설정합니다. */}
          <img ref={imageRef} src={selectedImage} alt="Selected" width="300" />
        </div>
      )}
    </div>
    <BottomNavbar />
    </div>
  );
};

export default DetectionPage;