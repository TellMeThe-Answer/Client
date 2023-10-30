import React, {useState, useEffect, useRef} from 'react';
import UploadData from "../../config/diagnoseInformation.json";
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { Dropdown, initTE } from "tw-elements";
//import 'tw-elements/dist/tw-elements.css';
initTE({ Dropdown });
// Initialization for ES Users


const ImageUpdoadComponent = () =>{
    const [uploaded, setUploaded] = useState(false);
    const [sent, setSent] = useState(false);
    const [preview, serPreview] = useState();
    const imageRef = useRef(null);
    let cropper;

    const setPreviewImg = (event) => {

        var reader = new FileReader();
        reader.onload = function(event) {
            serPreview(event.target.result);
            setUploaded(true);
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    const submitImg = (event) => {
        setSent(true);
    }
    
    useEffect(() => {
        if (uploaded) {
          cropper = new Cropper(imageRef.current, {
          aspectRatio: 16 / 9, // Adjust the aspect ratio as needed
          // You can customize other Cropper options here
          });
        }
      }, [uploaded]);

    useEffect(()=>{
        console.log(UploadData.contents);
        setUploaded(false);
    }, [])
    return(
        <>
            <div class="flex items-center justify-center w-full h-full mb-2">
            {/** 이미지 업로드 */}
            {uploaded === true ? 
            <label className = "w-full h-full rounded-xl">
            <img src = {preview} className = "w-full h-full rounded-xl"alt="Croppable" ref={imageRef}/>
            <input id="dropzone-file" type="file" class="hidden" onChange={setPreviewImg}/>
            </label>
             :
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-white">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500">SVG, PNG, JPG (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" onChange={setPreviewImg}/>
                    </label>
            }
            </div> 
            {sent === true ? 
            <div className = "w-full h-20 flex flex-col items-center justify-center bg-white rounded-lg text-sm font-semibold shadow-md ... p-4">
                <div className = "mb-2 text-md font-bold">분석결과</div>
                <div className = "text-red-500">분석 결과는 참고용으로만 확인해주시길 바랍니다.</div>
            </div>
            :
            <div className = "w-full h-20 flex flex-col justify-center bg-white rounded-lg text-sm font-semibold shadow-md ... p-4">
                <div>토마토일 확률이 70%입니다.</div>
                <div>병해를 측정하려면 진단하기 버튼을 눌러주세요.</div>
            </div>
            }

            {/** 진단결과 */}
            {sent === true ? 
            <>
                <div className = "w-full flex justify-end text-gray-400 text-sm mt-4">단위(%)</div>
                <div className = "w-full flex flex-col items-center justify-center bg-white rounded-lg text-sm font-semibold shadow-md ... p-4">
                    {UploadData.contents.map((data) => (
                            <div className = "w-full flex justify-between">
                                <div>{data.disease}</div>
                                <div className = "flex">
                                    <div className = "text-sm mr-1 mb-0.5">{data.percentage}%</div>
                                    <div className = "text-sm hover:text-[#10b981]"
                                    data-te-toggle="modal"
                                    data-te-target="#detailBottomModal"
                                    data-te-ripple-init
                                    data-te-ripple-color="light">상세보기</div>
                                </div>
                            </div>
                        ))}
                </div>
            </> :
            <></>}

            {/** 버튼 */}
            <div className = "w-full flex justify-center fixed bottom-0 left-0 mb-7">
                <button
                    onClick={submitImg}
                    type="button"
                    className="w-full h-14 inline-block rounded-xl bg-[#10b981] mx-10 pb-1.5 pt-2 text-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#10b981] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#10b981] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#10b981] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                    바로 병해 진단하기
                </button>
            </div>

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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" data-te-modal-dismiss>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>

                {/** 사진, 작물명, 병해충명, 학명 */}
                <div className = "w-full flex mb-4">

                    <div className = "h-24 w-24">
                        <img src = "https://cdn-icons-png.flaticon.com/128/877/877712.png"/>
                    </div>

                    <div className = "flex flex-col justify-evenly ml-4">
                        <div>작물명 : 작물명</div>
                        <div>병해충명 : 작물이름</div>
                        <div>학명: 학명</div>
                    </div>
                </div>
                    
                {/** 내용 */}
                <div className = "flex flex-col justify-around h-80">
                    <div>
                        <div className = "text-3xl font-bold mb-2">피해</div>
                        <p>피해정도</p>
                    
                    </div>

                    <div>
                        <div className = "text-3xl font-bold mb-2">방제</div>
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