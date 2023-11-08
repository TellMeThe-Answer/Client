import React, { useState, useEffect} from "react";

const TopComponent = () => {

    const [email, setEmail] = useState();

    useEffect(()=>{
        setEmail(localStorage.getItem("email"));
    }, [])


    return(
        <>
        <div className="h-20 flex justify-end items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
        </div>

        <div className="flex justify-center items-center">

            {/*프로필 이미지 부분*/}
            <div className="mr-1 w-16 h-16 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" class="w-full h-full">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                </svg>
            </div>

            {/*이메일 및 설명*/}
            <div className="flex-1 pl-1 mr-16">
                <div className="font-bold text-lg">{email}</div>
                <div className="text-gray-600 text-sm">내 정보 확인</div>
            </div>
        </div>
        </>
    )
}
export default TopComponent;