import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from "recoil";
import { plantState } from "../../config/atom";
import { Link } from 'react-router-dom';
import { previewImage } from '../../config/atom';
import Modal from './Modal';

import { Dropdown, initTE } from "tw-elements";
initTE({ Dropdown });
// Initialization for ES Users


const ImageUpdoadComponent = () => {

    const [check, setCheck] = useState(false);
    {/** 미리보기 이미지 저장 */ }
    const [preview, serPreview] = useRecoilState(previewImage);
    {/** 이미지 저장 */ }
    const [selectedFile, setSelectedFile] = useState(null);
    {/**선택한 작물 */ }
    const [plant, setPlant] = useRecoilState(plantState);
    {/**판별 후 이미지 */ }
    const [uploadData, setUpdateData] = useState();
    {/**신고하기 버튼 */ }
    const [declare, setDclare] = useState(true);

    const setPreviewImg = (event) => {

        {/** 이미지 보내기 위해 임시저장 */ }
        const file = event.target.files[0];
        setSelectedFile(file);

        {/** 미리보기 이미지 저장 */ }
        var reader = new FileReader();
        reader.onload = function (event) {
            serPreview(event.target.result);
            setCheck(true);
            setDclare(true);
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                serPreview(reader.result);
                resolve();
            };
        });
    };

    {/**판별한 이미지 받아오는 코드 */ }
    const updateThumnail = async (image) => {

        const requestData = {
            image_name: image
        };

        axios.get('/predict',
            {
                responseType: 'arraybuffer',
                params: requestData, // 파라미터를 이렇게 전달해야 합니다.
            })

            .then(response => {
                // 받아온 데이터를 Blob으로 변환
                const blob = new Blob([response.data], { type: 'image/jpeg' });

                // Blob을 이용하여 이미지 파일 생성
                const imageFile = new File([blob], 'image.jpg', { type: 'image/jpeg' });
                encodeFileToBase64(imageFile);
                console.log(imageFile);
            })
            .catch(error => {
                console.error('이미지를 받아오는 중 에러 발생:', error);
            });

    }

    {/** 처음 이미지 판별위해 보내는 코드 */ }
    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('image_file', selectedFile);
            formData.append('crop_type', plant)

            try {
                const response = await axios.post('/predict', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('이미지 업로드 성공:', response.data);
                console.log('널 값 확인할 데이터:', response.data.contents);
                updateThumnail(response.data.image_path);
                setUpdateData(response.data.contents)
                console.log(response.data.contents)
            } catch (error) {
                console.error('이미지 업로드 실패:', error);
            }
        }
        if (check) {
            setDclare(false);
        }
        else {
            return (<Modal />);
        }
    };

    useEffect(() => {
        setCheck(false);
    }, [])

    return (
        <>
         {check === false ?
            <div className="w-full text-center items-center">
                <div className="h-full rounded-lg border-2 border-gray-300 p-2 bg-[#10b981] mx-20 text-white"><strong>{plant}</strong></div>
            </div> : <></>
            }
            <div class="flex items-center justify-center w-full h-full mb-2">
                {/** 이미지 업로드 */}
                {check === true ?
                    <label className="w-full h-full rounded-xl">
                        <img src={preview} className="w-full h-full rounded-xl" />
                        <input id="dropzone-file" type="file" class="hidden" onChange={setPreviewImg} />
                    </label>
                    :
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-white">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span></p>
                            <p class="text-xs text-gray-500">SVG, PNG, JPG (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" onChange={setPreviewImg} />
                    </label>
                }
            </div>

            {check === false ?
                <div className='p-2 flex rounded-3xl border-2 border-none bg-[#e5f6f0] h-24'>
                    <div className='w-24 h-full flex justify-center items-center'>
                        <img src='/images/warning.png' className='max-w-full max-h-full'></img>
                    </div>
                    <div className='w-full h-full flex justify-center items-center text-[#10b981]'>
                        {/* {plant}이미지 외 사진은 부정확한 결과를 얻으실 수 있습니다. */}
                        다른 이미지들은 부정확한 결과를 얻을 수 있습니다.
                    </div>
                </div>
                : <></>}
            {check === true ?
                <div className="w-full h-20 flex flex-col items-center justify-center bg-white rounded-lg text-sm font-semibold shadow-md ... p-4">
                    <div className="mb-2 text-md font-bold">분석결과</div>
                    <div className="text-red-500">분석 결과는 참고용으로만 확인해주시길 바랍니다.</div>
                </div>
                :
                <></>
            }

            {/** 진단결과 */}
            {check === true ?
                <>
                    <div className="w-full flex justify-end text-gray-400 text-sm mt-4">단위(%)</div>
                    <div className="w-full flex flex-col items-center justify-center bg-white rounded-lg text-sm font-semibold shadow-md ... p-4">
                        {uploadData != null ? uploadData.map((data) => (
                            <div className="w-full flex justify-between">
                                {data == null ?
                                    <div>
                                        <div>병해가 발견되지 않았습니다.</div>
                                    </div>
                                    :
                                    <>
                                        <div>{data.disease}</div>
                                        <div className="flex">
                                            <div className="text-sm mr-1 mb-0.5">{data.percentage}%</div>

                                            <a href={data.disease_url} target="_blank" className="text-sm hover:text-[#10b981]"
                                            >상세보기</a>
                                        </div>
                                    </>
                                }
                            </div>
                        )) :
                            <div>
                            </div>
                        }
                    </div>
                </> :
                <></>
            }

            {/** 버튼 */}
            {declare ?
                <div className="w-full flex justify-center fixed bottom-0 left-0 mb-7">
                    <button
                        type="button"
                        onClick={handleUpload}
                        className="w-full h-14 inline-block rounded-xl bg-[#10b981] mx-10 pb-1.5 pt-2 text-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#10b981] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#10b981] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#10b981] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                        바로 병해 진단하기
                    </button>
                </div>
                :
                <div className="w-full flex justify-center fixed bottom-0 left-0 mb-7">
                    <Link to='/declaration' className="w-full h-14 flex justify-center items-center rounded-xl bg-[#10b981] mx-10 pb-1.5 pt-2 text-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#10b981] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#10b981] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#10b981] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                        병해 신고하기
                    </Link>
                </div>
            }

            {/** 모달 창 */}
            <div
                data-te-modal-init
                className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-hidden outline-none"
                id="detailBottomModal"
                tabindex="-1"
                aria-labelledby="exampleFrameBottomModalLabel"
                aria-hidden="true">
                <div data-te-modal-dialog-ref className="h-2/3 pointer-events-none absolute bottom-0 w-full translate-y-[50px] opacity-0 transition-all duration-300 ease-in-out">
                    <div className="pointer-events-auto relative flex w-full h-full flex-col border-none bg-white bg-clip-padding shadow-lg outline-none">
                        <div className="relative h-full p-5" data-te-modal-body-ref>

                            {/** x svg 이미지 */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6" data-te-modal-dismiss>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>

                            {/** 사진, 작물명, 병해충명, 학명 */}
                            <div className="w-full flex mb-4">

                                <div className="h-24 w-24">
                                    <img src="https://cdn-icons-png.flaticon.com/128/877/877712.png" />
                                </div>

                                <div className="flex flex-col justify-evenly ml-4">
                                    <div>작물명 : 작물명</div>
                                    <div>병해충명 : 작물이름</div>
                                    <div>학명: 학명</div>
                                </div>
                            </div>

                            {/** 내용 */}
                            <div className="flex flex-col justify-around h-80">
                                <div>
                                    <div className="text-3xl font-bold mb-2">피해</div>
                                    <p>피해정도</p>

                                </div>

                                <div>
                                    <div className="text-3xl font-bold mb-2">방제</div>
                                    <p>방제방법</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default ImageUpdoadComponent;