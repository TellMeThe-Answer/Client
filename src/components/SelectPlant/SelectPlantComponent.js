import React, { useState } from "react";

const SelectPlantComponent = () => {
    return(
        <>
        <div className = "h-4/5 w-full flex justify-center">
            <div className = "bg-white w-full h-3/5 rounded-3xl drop-shadow-md ... mt-10">
                <div className = "w-full h-full grid grid-cols-2">
                    <div className = "flex flex-col items-center justify-center">
                        <img src = "https://cdn-icons-png.flaticon.com/128/877/877712.png" className = "p-12"/>
                        <div>토마토</div>
                    </div>
                    <div className = "flex flex-col items-center justify-center">
                        <img src = "https://cdn-icons-png.flaticon.com/128/2753/2753932.png" className = "p-12"/>
                        <div>딸기</div>
                    </div>
                    <div className = "flex flex-col items-center justify-center">
                        <img src = "https://cdn-icons-png.flaticon.com/128/7758/7758758.png" className = "p-12"/>
                        <div>오이</div>
                    </div>
                    <div className = "flex flex-col items-center justify-center">
                        <img src = "https://cdn-icons-png.flaticon.com/128/284/284834.png" className = "p-12"/>
                        <div>고추</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default SelectPlantComponent;