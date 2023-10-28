import React, { useState, useEffect } from "react";
import DropDownComponent from "./DropDownComponent";
import {useRecoilValue} from "recoil";
import {useRecoilState} from "recoil";
import { plantDescription, plantState, plantImage} from "../../config/atom";
import plantData from "../../config/plantInformation.json"
import { Dropdown, initTE } from "tw-elements";
initTE({ Dropdown });
// Initialization for ES Users

const SelectDescriptionComponent = () => {

    const selectPlant = useRecoilValue(plantState);
    const selectPlantImage = useRecoilValue(plantImage);
    const selectPlantDisease = useRecoilValue(plantDescription);

    return(
        <>
        <div className = "bg-white w-full h-72 pl-6 pr-6 pt-4 flex flex-col justify-rounded">
            <div className = "w-full h-24 flex">
                <div className = "text-xl font-bold w-3/4 h-full">
                    잠깐! 검사 전 병해충 정보를 <div>확인해보세요!</div>
                </div>
                {/**전구 이미지 */}
                <div className = "h-full w-28 pl-6">
                    <img src = "https://cdn-icons-png.flaticon.com/128/7405/7405619.png" className = "h-20"/>
                </div>
            </div>
            
            <div className = "h-3/5 w-full">
                <div className = "font-bold text-lg mb-2 h-1/5">{selectPlant} 주요병해충 정보</div>
                <div className = "w-full h-4/5 flex justify-between">

                    <div className = "h-1/2 w-24">
                        <img src = {selectPlantImage}/>
                    </div>

                    <div className = "flex flex-col h-1/2">
                       {/**
                        {selectPlantDisease.map((description, index) => (
                            <div key={index}>
                            {description}
                            </div>
                        ))} */} 
                        <div className = "flex w-52 justify-between">
                            <div>
                                {selectPlantDisease.map((description, index) => {
                                    if(index % 2 == 0){
                                        return (
                                                <div key = {index}>
                                                <div>{description}</div>
                                                </div>
                                        )
                                    }})
                                }
                            </div>
                            <div>
                            {selectPlantDisease.map((description, index) => {
                                    if(index % 2 != 0){
                                        return (
                                                <div key = {index}>
                                                <div>{description}</div>
                                                </div>
                                        )
                                    }})
                                }
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