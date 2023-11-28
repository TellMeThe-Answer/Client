import React from 'react';
import {Link} from 'react-router-dom';
import "./FirstPage.css"

const FirstPage = () =>{
    return (
        <>
        <div className="w-full h-full flex justify-center items-center firstpage-container">
            <div className = "w-full justify-center items-center">
                <div className = "flex justify-center w-full">
                    <img src = "/images/logo.png" className='firstpage-logo'/>
                </div>
                <div className ="text-white text-xl font-semibold flex justify-center mt-10">로그인 후 이용해주세요.</div>
                <div className = "flex justify-center w-full">
                    <Link to='/login' className = "w-40 h-10 mt-10 bg-[#10b981] text-white rounded-lg flex justify-center items-center text-xl">시작하기</Link>
                </div>
            </div>
        </div>
        </>   
    )
}
export default FirstPage;