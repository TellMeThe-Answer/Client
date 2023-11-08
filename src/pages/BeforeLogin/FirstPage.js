import React from 'react';
import {Link} from 'react-router-dom';

const FirstPage = () =>{
    return (
        <>
        <div className="w-full h-full bg-white flex justify-center items-center">
            <div className = "w-full justify-center items-center">
                <div className = "flex justify-center w-full">
                    <img src = "https://cdn-icons-png.flaticon.com/128/5269/5269534.png"/>
                </div>
                <div className = "text-2xl font-semibold flex justify-center mt-10">로그인 후 이용해주세요.</div>
                <div className = "flex justify-center w-full">
                    <Link to='/login' className = "w-40 h-10 mt-10 bg-[#10b981] text-white rounded-lg flex justify-center items-center">로그인</Link>
                </div>
            </div>
        </div>
        </>   
    )
}
export default FirstPage;