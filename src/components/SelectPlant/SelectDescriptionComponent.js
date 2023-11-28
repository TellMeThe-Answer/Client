import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { plantDescription, plantState, plantImage } from "../../config/atom";
import diseaseData from "../../config/modalInformation.json";
import {
    Modal,
    Ripple,
    initTE,
} from "tw-elements";

initTE({ Modal, Ripple });

const SelectDescriptionComponent = () => {
    const [selectPlant, setPlant] = useRecoilState(plantState);
    const [selectPlantImage, setSelectImage] = useRecoilState(plantImage);
    const [selectPlantDisease, setDescription] = useRecoilState(plantDescription);

    const [image, setImage] = useRecoilState(plantImage);
    {/**선택한 데이터 배열 */ }
    const [modalData, setModalData] = useState();
    {/**선택한 병해명 */ }
    const [diseaseName, setDiseaseName] = useState();
    {/**선택한 병해 이미지*/ }
    const [modalImage, setModalImage] = useState();
    {/**학명 */ }
    const [scientifiName, setScientifiName] = useState();
    {/**피해 */ }
    const [damage, setDamage] = useState();
    {/**방제방법 */ }
    const [treat, setTreat] = useState();
    {/**링크 */ }
    const [link, setLink] = useState();


    const setInformation = (disease, information) => {
        information.map((data, index) => {
            if (data.plantDisease == disease) {
                setDiseaseName(disease);
                setModalImage(data.plantImage);
                setScientifiName(data.scientifiName);
                setDamage(data.damage);
                setTreat(data.treat);
                setLink(data.link);
            }
        })
    }

    const getInformation = (disease) => {
        diseaseData.map((plant, index) => {
            if (plant.plantName === selectPlant) {
                console.log(plant.plantName, selectPlant);
                setModalData(plant.information);
                setInformation(disease, plant.information);
            }
        })
    }

    useEffect(() => {
        initTE({ Modal, Ripple });
    }, []);

    return (
        <>
            <div className="bg-gray-50 w-full h-72 pl-6 pr-6 pt-4 flex flex-col justify-rounded">
                <div className="w-full h-24 flex">
                    <div className="text-xl font-bold w-3/4 h-full">
                        잠깐! 검사 전 병해충 정보를 <div>확인해보세요!</div>
                    </div>
                    {/**전구 이미지 */}
                    <div className="h-full w-28 pl-6">
                        <img src="https://cdn-icons-png.flaticon.com/128/7405/7405619.png" className="h-20" />
                    </div>
                </div>

                <div className="h-3/5 w-full">
                    <div className="font-bold text-lg mb-2 h-1/5">{selectPlant} 주요병해충 정보</div>
                    <div className="w-full h-4/5 flex justify-between">

                        <div className="h-1/2 w-24">
                            <img src={image} />
                        </div>

                        <div className="flex flex-col h-1/2">

                            <div className="flex w-52 justify-between">
                                <div>
                                    {selectPlantDisease.map((description, index) => {
                                        if (index % 2 == 0) {
                                            return (
                                                <div key={index} onClick={() => getInformation(description)}
                                                    data-te-toggle="modal"
                                                    data-te-target="#exampleFrameBottomModal"
                                                    data-te-ripple-init
                                                    data-te-ripple-color="light">
                                                    <div>{description}</div>
                                                </div>
                                            )
                                        }
                                    })
                                    }
                                </div>
                                <div>
                                    {selectPlantDisease.map((description, index) => {
                                        if (index % 2 != 0) {
                                            return (
                                                <div key={index} onClick={() => getInformation(description)}
                                                    data-te-toggle="modal"
                                                    data-te-target="#exampleFrameBottomModal"
                                                    data-te-ripple-init
                                                    data-te-ripple-color="light">
                                                    <div>{description}</div>
                                                </div>
                                            )
                                        }
                                    })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/** 모달 창 */}

                <div
                    data-te-modal-init
                    className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-hidden outline-none"
                    id="exampleFrameBottomModal"
                    tabindex="-1"
                    aria-labelledby="exampleFrameBottomModalLabel"
                    aria-hidden="true">
                    <div data-te-modal-dialog-ref className="h-2/3 pointer-events-none absolute bottom-0 w-full translate-y-[50px] opacity-0 transition-all duration-300 ease-in-out">
                        <div className="rounded-t-2xl pointer-events-auto relative flex w-full h-full flex-col border-none bg-gray-50 bg-clip-padding shadow-lg outline-none">
                            <div className="relative h-full p-5" data-te-modal-body-ref>

                                {/** x svg 이미지 */}
                                <div className="flex justify-end w-full">
                                    <div className="w-40 text-center border-b-gray-400 border-solid border mr-16 my-2.5 mb-5"></div>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6" data-te-modal-dismiss>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                
                                {/** 사진, 작물명, 병해충명, 학명 */}
                                <div className="flex mb-4 bg-white w-full h-50 rounded-xl mt-4 p-2 drop-shadow-md ">
                                    <div className="h-36 w-36">
                                        <img src={modalImage} className="w-36 h-36 rounded-xl" />
                                    </div>

                                    <div className="flex flex-col justify-evenly ml-5">
                                        <div>작물명 : {selectPlant}</div>
                                        <div>병해충명 : {diseaseName}</div>
                                        <div>학명: {scientifiName}</div>
                                    </div>
                                </div>

                                {/** 내용 */}
                                <div className="flex flex-col justify-center h-fit bg-white w-full rounded-xl mt-4 p-2 drop-shadow-md ">
                                    <div className="mb-4">
                                        <div className="text-3xl font-bold mb-2">피해</div>
                                        <p>{damage}</p>

                                    </div>

                                    <div>
                                        <div className="text-3xl font-bold mb-2">방제</div>
                                        <p>{treat}</p>
                                    </div>
                                </div>

                                {/** 버튼 */}
                                <div className="w-full flex justify-center fixed bottom-0 left-0 mb-7">
                                    <a href={link} target="_blank" rel="noopener noreferrer">
                                        <button
                                            type="button"
                                            className="ml-2 inline-block rounded bg-[#10b981] px-7 pb-1.5 pt-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#10b981] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#10b981] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#10b981] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                                        <span className="fs-4">더보기</span>        
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SelectDescriptionComponent;