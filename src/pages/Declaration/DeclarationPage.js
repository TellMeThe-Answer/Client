
import React from 'react';
import MoveBackComponent from '../../components/common/MoveBackComponent';
import DeclarationComponent from '../../components/Declaration/DeclarationComponent';

const DeclarationPage = () =>{

    return(
        <>
            <div className="w-full h-full bg-gray-50">
                <MoveBackComponent/>
                <DeclarationComponent/>
            </div>
        </>
    )
}
export default DeclarationPage;