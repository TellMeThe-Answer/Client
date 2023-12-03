import React, { useState, useEffect, useRef } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import './App.css';
import {
    Modal,
    Ripple,
    initTE,
} from "tw-elements";

const DetectionPage = () => {
    const [preview, setPreview] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const imageRef = useRef(null);
    let cropper;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageDataUrl = e.target.result;
                setPreview(imageDataUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCrop = () => {
        if (cropper) {
            const croppedCanvas = cropper.getCroppedCanvas();
            if (croppedCanvas) {
                const croppedImage = croppedCanvas.toDataURL(); // 크롭된 이미지 데이터 URI 가져오기
                setCroppedImage(croppedImage); // 크롭된 이미지 설정
            }
			closeModal(); // Crop 버튼 클릭 시 모달 닫기
        }
    };


    const closeModal = () => {
		setPreview(null);
    };

    useEffect(() => {
        if (preview && imageRef.current) {
          cropper = new Cropper(imageRef.current, {
            aspectRatio: 1 / 1,
            viewMode: 1, // 1: 원본 이미지 비율 유지
          });
        }
      }, [preview]);

    useEffect(() => {
        initTE({ Modal, Ripple });
    }, [])


    return (
        <div>
            <div style={{ padding: '40px' }}>
                <label htmlFor="imageUpload" className="subwayButton">
                    Select Image
                    <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                </label>

                {/* 이미지 띄우고 크롭하기 */}
                {preview && (
                    <div>
                        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                    <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div class="sm:flex sm:items-start">
                                               
                                                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                    <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">이미지 자르기</h3>
                                                    <div class="mt-2">
													<img className='h-full w-full' ref={imageRef} src={preview} alt="Selected" width="300" />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button type="button" onClick={handleCrop}  class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">잘라내기</button>
                                            <button type="button" onClick={closeModal} class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">취소하기</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )}

                {/* 자른 이미지 보여주기 */}
                {croppedImage && (
                    <div>
                        <h2>Cropped Image:</h2>
                        <img src={croppedImage} alt="Cropped" />
                        {/* 자른 이미지 데이터 URL을 input에 설정 */}
                        <input type="text" value={croppedImage} readOnly />
                    </div>
                )}
            </div>




        </div>
    );
};

export default DetectionPage;


