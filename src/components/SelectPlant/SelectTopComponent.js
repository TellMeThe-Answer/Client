import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../common/BackButton";
import DropDownComponent from "./DropDownComponent";
// Initialization for ES Users

const SelectTopComponent = () => {
    const navigate = useNavigate(); //변수 할당시켜서 사용
    const onClickBtn = () => {
        navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
    };

    return(
        <>
        <div className = "h-16 w-full bg-white">
            <div className = "w-full h-full flex items-center pl-4">
                <BackButton/>
            </div>
        </div>
        </>
    )
}
export default SelectTopComponent;