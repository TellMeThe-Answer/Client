import React, { useRef, useState } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

const ImageCropper = () => {
  const imageElement = useRef(null);
  const [cropper, setCropper] = useState(null);

  // Cropper 초기화
  const initializeCropper = () => {
    if (imageElement && imageElement.current) {
      const cropperInstance = new Cropper(imageElement.current, {
        // CropperJS 옵션 설정
        aspectRatio: 16 / 9, // 크롭 비율 설정 (원하는 비율로 수정 가능)
        // 다른 CropperJS 옵션들도 설정할 수 있습니다.
      });
      setCropper(cropperInstance);
    }
  };

  // 이미지 변경 시 Cropper 다시 초기화
  const handleImageChange = (e) => {
    if (cropper) {
      cropper.destroy(); // 이전 Cropper 인스턴스 파괴
    }
    initializeCropper(); // 새로운 이미지로 Cropper 초기화
  };

  // 크롭된 이미지 가져오기
  const getCroppedImage = () => {
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      if (croppedCanvas) {
        // 크롭된 이미지 데이터 URI 반환
        const croppedImage = croppedCanvas.toDataURL('image/jpeg');
        console.log('크롭된 이미지 데이터 URI:', croppedImage);
        // 여기서 croppedImage를 사용하여 원하는 작업 수행 가능
      }
    }
  };

  return (
    <div>
      {/* 이미지 업로드 */}
      <input type="file" onChange={handleImageChange} />
      {/* Cropper 컨테이너 */}
      <div>
        <img ref={imageElement} src="이미지 URL" alt="크롭할 이미지" />
      </div>
      {/* 크롭된 이미지 가져오기 */}
      <button onClick={getCroppedImage}>이미지 크롭</button>
    </div>
  );
};

export default ImageCropper;