import React, { useState, useEffect } from "react";
import DropDownComponent from "./DropDownComponent";
import {useRecoilValue} from "recoil";
import { plantState } from "../../config/atom";
import plantData from "../../plantInformation.json"

const SelectDescriptionComponent = () => {

    const selectPlant = useRecoilValue(plantState);

    const [data, setData] = useState(plantData);

    const [selectData, setSelectData] = useState();

    useEffect(()=>{
        plantData.map((elem, index)=>{
            if(elem.plantName === selectPlant){
                setSelectData(elem);
            }
        })
        console.log(data);
    }, [selectData])

    return(
        <>
        <div className = "bg-white w-full h-2/5 rounded-xl pl-6 pr-6 pt-4 drop-shadow-md ... flex flex-col justify-between">
            <div className = "w-full h-2/5 flex">
                <div className = "text-xl font-bold w-3/4 h-full">
                    잠깐! 검사 전 병해충 정보를 <div>확인해보세요!</div>
                    <div className = "w-24 mt-1 mb-1 flex justify-center items-center">
                        <div className = "font-semibold text-gray-500 w-24">
                            <DropDownComponent/>
                        </div>
                    </div>
                </div>

                {/**작물 이미지 */}
                <div className = "h-full w-28 pl-6">
                    <img src = "https://cdn-icons-png.flaticon.com/128/7405/7405619.png" className = "h-20"/>
                </div>
            </div>
            
            <div className = "h-3/5 w-full pt-3">
                <div className = "font-bold text-lg mt-2 h-1/5">{selectPlant} 주요병해충 정보</div>
                <div className = "w-full h-4/5 flex justify-between">

                    <div className = "h-1/2 w-24">
                        <img src = "https://cdn-icons-png.flaticon.com/128/877/877712.png"/>
                    </div>

                    <div className = "flex flex-col h-1/2">
                        <div className = "flex w-60 justify-around">
                        <div>아메리카잎굴파리</div>
                        <div>아메리카잎굴파리</div>
                        </div>
                        <div className = "flex w-60 justify-around">
                        <div>역병</div>
                        <div>아메리카잎굴파리</div>
                        </div><div className = "flex w-60 justify-around">
                        <div>역병</div>
                        <div>아메리카잎굴파리</div>
                        </div><div className = "flex w-60 justify-around">
                        <div>역병</div>
                        <div>아메리카잎굴파리</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default SelectDescriptionComponent;