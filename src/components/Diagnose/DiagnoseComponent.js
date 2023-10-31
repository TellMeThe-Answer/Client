import MoveBackComponent from '../common/MoveBackComponent'
import ImageUpdoadComponent from './ImageUpdoadComponent';
import React from 'react';

const DiagnoseComponent = () =>{

    return(
        <>
            <MoveBackComponent/>
            <div className = "w-full h-96 p-10">
                <ImageUpdoadComponent/>
            </div>
        </>
    )
}
export default DiagnoseComponent;