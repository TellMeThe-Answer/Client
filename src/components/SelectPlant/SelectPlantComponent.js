import React, { useState } from "react";

const SelectPlantComponent = () => {
    return(
        <>
        <div className = "h-full w-full">
            <div className = "flex justify-center items-center bg-white w-full h-3/5 drop-shadow-md ...">
                <div className = "w-4/5 h-4/5 grid grid-cols-2 items-center justify-items-center">
                    <div className = "flex flex-col items-center justify-center h-24 w-24">
                        <img src = "https://cdn-icons-png.flaticon.com/128/877/877712.png"/>
                        <div>토마토</div>
                    </div>
                    <div className = "flex flex-col items-center justify-center h-24 w-24">
                        <img src = "https://cdn-icons-png.flaticon.com/128/2753/2753932.png"/>
                        <div>딸기</div>
                    </div>
                    <div className = "flex flex-col items-center justify-center h-24 w-24">
                        <img src = "https://cdn-icons-png.flaticon.com/128/7758/7758758.png"/>
                        <div>오이</div>
                    </div>
                    <div className = "flex flex-col items-center justify-center h-24 w-24">
                        <img src = "https://cdn-icons-png.flaticon.com/128/284/284834.png"/>
                        <div>고추</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default SelectPlantComponent;