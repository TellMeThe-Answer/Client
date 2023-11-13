import React, { useState } from "react";
import BackButton from "../common/BackButton";

const MoveBackComponent = () => {

    return(
        <>
        <div className = "h-16 w-full bg-gray-50">
            <div className = "w-full h-full flex justify-between items-center pl-4">
                <BackButton/>
            </div>
        </div>
        </>
    )
}
export default MoveBackComponent;