import React, { useState } from "react";


const DiagnosisComponent = () => {
    return(
        <>
        <div className = "bg-white w-full h-20 rounded-xl mt-4 p-6 drop-shadow-md ... hover:bg-gray-100">
            <div className = "w-full h-full flex items-center justify-between ">
                
                <div className = "font-bold text-xl">병해 검사하기</div>

                {/**돋보기 이미지 */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
        </>
    )
}
export default DiagnosisComponent;