import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate(); //변수 할당시켜서 사용
    const onClickBtn = () => {
        navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
    };

    return(
        <>
            <button onClick={onClickBtn}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
        </>
    )
}
export default BackButton;