import React, { useState } from "react";
import {Link} from 'react-router-dom'

const CheckComponent = () => {
    return(
        <>
        <div className = "bg-white w-full h-40 rounded-xl mt-4 p-6 drop-shadow-md ... hover:bg-gray-100">
            <Link to='/map' >
            <div className = "w-full h-20 flex">
                <div className = "text-xl font-bold w-3/4 h-full">
                    주변에 병해 피해가 있는지 확인해보세요!
                </div>
                {/**사이렌 이미지 */}
                <div className = "h-full w-28 pl-6">
                    <img src = "https://img.icons8.com/?size=128&id=ttHPlyUknrX7&format=png" className = "h-20"/>
                </div>
            </div>
            <div className = "bg-gray-200 w-28 h-8 rounded-lg flex justify-center items-center">
                <div className = "font-semibold text-gray-500">병해 확인하기</div>
            </div>
            </Link>
        </div>
        </>
    )
}
export default CheckComponent;