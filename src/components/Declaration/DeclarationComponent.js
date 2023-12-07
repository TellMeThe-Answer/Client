
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { mapLocation } from "../../config/atom";
import { useRecoilState } from "recoil";
import { previewImage } from '../../config/atom';
import Modal from './Modal';
import axios from "axios";

const DeclarationComponent = () => {

    const [mapAddress, setMapAddress] = useRecoilState(mapLocation);
    const [preview, setPreview] = useRecoilState(previewImage)
    const [popup, setPopup] = useState(false);
    const [memberId, setMemberId] = useState(0);
    
    
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        crop: '',
        latitude: 1,
        longitude: 1,
        disease: '',
        location: '',
        memberId : 0,
        multipartFileList: null,
    });

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        return blob;
    };

    const onClickReport = async (e) => {
        e.preventDefault();
        setPopup(current => !current);
    
        const croppedBlob = dataURItoBlob(preview); // 데이터 URI를 Blob으로 변환
        const croppedFile = new File([croppedBlob], 'cropped_image.png', { type: 'image/png' }); // Blob을 File 객체로 변환
      
        const newFormData = {
            ...formData,
            memberId: memberId,
            multipartFileList: croppedFile,
            location : mapAddress,
        };
    
        setFormData(newFormData); 
    }


    useEffect(() => {
        if (formData.memberId !== undefined && formData.multipartFileList !== null && formData.content !== null) {

            axios.post('/report/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                console.log('POST 요청 성공:', response.data);
            })
            .catch(error => {
                console.error('POST 요청 실패:', error);
            });
        }
    }, [formData]);

    useEffect(()=> {
        const storedMemberId = localStorage.getItem('memberId');
        setMemberId(storedMemberId);
        setFormData(prevFormData => ({
            ...prevFormData,
            memberId: storedMemberId
        }));
    },[])

    return (
        <>
            <div className="w-full h-16 flex justify-center text-lg font-bold">병해 신고</div>

            <div className="w-full rounded-xl pr-5 pl-7">
                {/**
                <div class="relative z-0">
                    <input type="text" id="floating_standard" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label for="floating_standard" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">제목</label>
                </div>
                */}

                <form className="w-full h-full">
                    <div className="w-full h-11 flex justify-between items-center mb-5">
                        <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                            <label for="title" className="ml-0.5">제목</label>
                        </div>
                        <input type="text" id="title" name="title" onChange={handleChange}  className="border border-gray-400 w-4/5 h-full rounded-lg p-3"></input>
                    </div>


                    <div className="w-full h-11 flex justify-between items-center mb-5">
                        <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            <div className="ml-0.5">위치</div>
                        </div>

                        <Link to='/location' className="w-4/5 h-full rounded-lg p-2.5 flex justify-between">
                            <div className="text-gray-700">{mapAddress}</div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" class="w-6 h-6 text-gray-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </Link>
                    </div>

                    <div className="w-full h-11 flex justify-between items-center mb-5">
                        <div className="flex">
                            <img width="24" height="24" src="https://img.icons8.com/material/24/natural-food--v1.png" />
                            <label for="crop" className="ml-0.5">작물</label>
                        </div>
                        <input type="text" id="crop" name='crop' onChange={handleChange} className="border border-gray-400 w-4/5 h-full rounded-lg p-3"></input>
                    </div>

                    {/**병명 */}
                    <div className="w-full h-11 flex justify-between items-center mb-5">
                        <div className="flex">
                            <img width="24" height="24" src="https://img.icons8.com/?size=30&id=79722&format=png" />
                            <label for="disease"  className="ml-0.5">병명</label>
                        </div>
                        <input type="text" id="disease" name='disease' onChange={handleChange}  className="border border-gray-400 w-4/5 h-full rounded-lg p-3"></input>
                    </div>

                    {/**피해사진 */}
                    <div className="w-full h-11 flex justify-between items-center">
                        <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                            </svg>
                            <div className="ml-1">피해사진</div>
                        </div>
                    </div>

                    {/**피해사진 */}
                    <div className="w-full h-40 px-20 mt-4 mb-4">
                        <img className="w-full h-full flex justify-center items-center" src={preview} />
                    </div>

                    <div className="w-full h-11 flex items-center">
                        <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>
                            <label for="text" className="ml-1 w-full">세부사항</label>
                        </div>
                    </div>
                    <textarea type="text" id="content" name='content' onChange={handleChange} className="border border-gray-400 w-full h-24 rounded-lg px-4 py-2"></textarea>

                    {/** 버튼 */}
                    <div className="w-full flex justify-center fixed bottom-0 left-0 mb-4">
                        <button
                            onClick={onClickReport}
                            type="button"
                            className="w-full h-14 inline-block rounded-xl bg-[#10b981] mx-10 pb-1.5 pt-2 text-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#10b981] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#10b981] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#10b981] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                            신고하기
                        </button>
                    </div>
                </form>
                {popup ? <Modal onClose={setPopup} /> : null}
            </div>
        </>
    )
}
export default DeclarationComponent;