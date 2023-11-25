import React, { useState } from "react";
import {plantState, plantImage, plantDescription} from "../../config/atom";
import {useRecoilState} from "recoil";
import {Link} from 'react-router-dom';
import plantData from "../../config/plantInformation.json"

const SelectPlantComponent = () => {

    const [plant, setPlant] = useRecoilState(plantState);
    const [image, setImage] = useRecoilState(plantImage);
    const [description, setDescription] = useRecoilState(plantDescription);

    // 버튼 정보 배열
    const data = [
        { id: 0, image: "https://cdn-icons-png.flaticon.com/128/877/877712.png", name: "토마토" },
        { id: 1, image: "https://cdn-icons-png.flaticon.com/128/1652/1652128.png", name: "딸기" },
        { id: 2, image: "https://cdn-icons-png.flaticon.com/128/7758/7758758.png", name: "오이" },
        { id: 3, image: "https://cdn-icons-png.flaticon.com/128/284/284834.png", name: "고추" },
      ];

    const handleButtonClick = async(buttonName) => {
        await setPlant(buttonName.name);
        plantData.map((elem, index)=>{
            if(elem.plantName === buttonName.name){
                setImage(elem.plantImage);
                setDescription(elem.disease);
            }
        })
    };

    return(
        <>
        <div className = "h-full w-full">
            <div className = " h-12 w-full flex items-center justify-center bg-gray-50 pt-5 text-base font-bold">
                확인하고 싶은 작물을 선택해주세요
            </div>
            <div className = "flex justify-center items-center bg-gray-50 w-full h-96 drop-shadow-md ...">
                <div className = "w-4/5 h-4/5 grid grid-cols-2 items-center justify-items-center">
                    {data.map((button) => (
                        <button key={button.id} onClick={() => handleButtonClick(button)} className = "flex flex-col items-center justify-between h-36 w-24">
                                <img src = {button.image}/>
                                <div>{button.name}</div>
                        </button>
                    ))}
                </div>
            </div>

            
            <Link to='/diagnose' className = "w-full h-16 hover:bg-[#91f5d4] bg-[#10b981] flex justify-center items-center text-white font-semibold">진단하기로 넘어가기</Link>
        </div>
        </>
    )
}
export default SelectPlantComponent;