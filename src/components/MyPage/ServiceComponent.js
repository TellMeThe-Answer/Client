import React, { useState } from "react";


const ServiceComponent = () => {
    return(
        <>
        <div className = "bg-white w-full h-80 rounded-xl mt-4 p-6 drop-shadow-md ...">
        <div className = "w-full h-full">

                <div className = "flex justify-between">
                    <div className = "font-bold text-xl">고객센터</div>
                </div>

                <ul className = "h-3/4 w-full">
                    {/**신고내역 */}
                    <li className = "h-10 w-full flex items-center justify-between mt-2 rounded-2xl hover:bg-gray-100">
                        {/**왼쪽에 이미지 + 글 */}
                        <div className = "w-24 h-full flex items-center justify-between">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className = "h-8 w-8">
                                <linearGradient id="T9I8rAe3T7F~cNoCB08HGa_79056_gr1" x1="30.032" x2="30.032" y1="8" y2="55.68" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stopColor="#1a6dff"></stop><stop offset="1" stopColor="#c822ff"></stop></linearGradient><path fill="url(#T9I8rAe3T7F~cNoCB08HGa_79056_gr1)" d="M50.22,17.52c0.38-0.35,0.72-0.73,0.99-1.17c0.76-1.26,0.98-2.74,0.63-4.16 c-0.35-1.43-1.24-2.64-2.49-3.4c-1.26-0.75-2.74-0.98-4.16-0.63c-1.43,0.35-2.63,1.24-3.4,2.49c-0.12,0.21-0.22,0.42-0.31,0.64 c-7.51-1.8-13,4.65-16.82,9.15c-1.67,1.96-3.25,3.82-4.24,4.07c-0.76,0.18-1.48,0.36-2.18,0.52c-4.83,1.15-8.03,1.91-9.36,4.11 l0.06,0.03c-0.11,0.14-0.23,0.26-0.32,0.41c-1.3,2.15-0.31,5.4,2.79,9.15c2.8,3.39,7.06,6.91,12.01,9.96 c0.64,2.02,1.97,3.83,3.92,5.01c1.42,0.86,3.02,1.3,4.64,1.3c0.73,0,1.45-0.08,2.17-0.26c0.43-0.11,0.84-0.25,1.24-0.41 c2.81,0.89,5.27,1.35,7.28,1.35c2.62,0,4.48-0.75,5.38-2.24c0.09-0.15,0.14-0.31,0.21-0.47L48.31,53c1.33-2.19,0.52-5.38-0.7-10.2 c-0.17-0.69-0.36-1.41-0.54-2.17c-0.25-0.99,0.67-3.26,1.64-5.65C50.71,30.02,53.51,23.1,50.22,17.52z M43.51,11.69 c0.48-0.8,1.25-1.37,2.15-1.59c0.91-0.22,1.85-0.08,2.65,0.41c0.8,0.48,1.37,1.25,1.59,2.15c0.22,0.91,0.08,1.85-0.41,2.65 c-0.12,0.21-0.28,0.4-0.44,0.58c-0.89-1.03-2.03-1.99-3.48-2.87c-0.74-0.45-1.47-0.81-2.18-1.1C43.43,11.84,43.46,11.76,43.51,11.69 z M23.01,46.06c-4.14-2.7-7.67-5.72-10.06-8.61c-2.44-2.95-3.42-5.51-2.62-6.84c0.8-1.32,3.52-1.64,7.28-0.85 c4.2,0.9,9.24,3.03,14.19,6.03c0.78,0.47,1.54,0.96,2.29,1.46c-1.38-0.33-2.83-0.34-4.24,0.01c-2.33,0.57-4.31,2.02-5.55,4.08 C23.41,42.82,23,44.45,23.01,46.06z M33.67,52.8c-1.81,0.44-3.69,0.16-5.29-0.81c-3.31-2-4.37-6.31-2.37-9.61 c0.97-1.6,2.5-2.73,4.32-3.18c0.56-0.13,1.12-0.2,1.68-0.2c1.26,0,2.51,0.34,3.61,1.01c3.31,2,4.37,6.31,2.37,9.61 C37.02,51.22,35.49,52.35,33.67,52.8z M46.34,52.4c-0.92,1.52-4.2,1.69-8.61,0.53c0.77-0.63,1.44-1.39,1.97-2.27 c1.72-2.85,1.67-6.28,0.17-9.01c1.48,1.31,2.78,2.62,3.84,3.91C46.16,48.52,47.14,51.08,46.34,52.4z M46.85,34.23 c-1.19,2.94-2.12,5.26-1.72,6.88c0.18,0.76,0.37,1.49,0.54,2.18c0.2,0.8,0.39,1.55,0.57,2.27c-0.3-0.41-0.63-0.84-0.98-1.27 c-2.88-3.48-7.3-7.11-12.43-10.22c-5.13-3.1-10.39-5.33-14.81-6.26c-0.55-0.12-1.08-0.21-1.59-0.28c0.73-0.18,1.48-0.36,2.28-0.55 c0.7-0.17,1.43-0.34,2.19-0.53c1.62-0.4,3.24-2.31,5.28-4.72c4.53-5.33,10.16-11.96,18.36-7C52.73,19.69,49.47,27.75,46.85,34.23z"></path><linearGradient id="T9I8rAe3T7F~cNoCB08HGb_79056_gr2" x1="42.172" x2="42.172" y1="41.65" y2="53.687" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stopColor="#6dc7ff"></stop><stop offset="1" stopColor="#e6abff"></stop></linearGradient><path fill="url(#T9I8rAe3T7F~cNoCB08HGb_79056_gr2)" d="M46.34,52.4c-0.92,1.52-4.2,1.69-8.61,0.53c0.77-0.63,1.44-1.39,1.97-2.27 c1.72-2.85,1.67-6.28,0.17-9.01c1.48,1.31,2.78,2.62,3.84,3.91C46.16,48.52,47.14,51.08,46.34,52.4z"></path><linearGradient id="T9I8rAe3T7F~cNoCB08HGc_79056_gr3" x1="22.073" x2="22.073" y1="29.333" y2="46.06" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stopColor="#6dc7ff"></stop><stop offset="1" stopColor="#e6abff"></stop></linearGradient><path fill="url(#T9I8rAe3T7F~cNoCB08HGc_79056_gr3)" d="M34.09,37.25c-1.38-0.33-2.83-0.34-4.24,0.01c-2.33,0.57-4.31,2.02-5.55,4.08 c-0.89,1.48-1.3,3.11-1.29,4.72c-4.14-2.7-7.67-5.72-10.06-8.61c-2.44-2.95-3.42-5.51-2.62-6.84c0.8-1.32,3.52-1.64,7.28-0.85 c4.2,0.9,9.24,3.03,14.19,6.03C32.58,36.26,33.34,36.75,34.09,37.25z"></path>
                            </svg>
                            <div className = "font-semibold text-gray-500">공지사항</div>
                        </div>
                        {/**오른쪽 꺽쇠 svg */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </li>

                    {/**왼쪽에 이미지 + 글 */}
                    <li className = "h-10 w-full flex items-center justify-between mt-2 hover:bg-gray-100 rounded-2xl">
                        {/**왼쪽에 이미지 + 글 */}
                        <div className = "w-20 h-full flex items-center justify-between">
                            <img src = "https://img.icons8.com/?size=160&id=S2nXC8Z2nl3J&format=png" className = "h-8 w-8"/>
                            {/**<img src = "https://img.icons8.com/?size=128&id=4uul8RsD9D9K&format=png" className = "h-8 w-8"/> */}
                            <div className = "font-semibold text-gray-500">이벤트</div>
                        </div>
                        {/**오른쪽 꺽쇠 svg */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </li>

                    {/**왼쪽에 이미지 + 글 */}
                    <li className = "h-10 w-full flex items-center justify-between mt-2 hover:bg-gray-100 rounded-2xl">
                        {/**왼쪽에 이미지 + 글 */}
                        <div className = "w-16 h-full flex items-center justify-between">
                            <img src = "https://img.icons8.com/?size=128&id=119074&format=png" className = "h-8 w-8"/>
                            <div className = "font-semibold text-gray-500">정보</div>
                        </div>
                        {/**오른쪽 꺽쇠 svg */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </li>

                    {/**왼쪽에 이미지 + 글 */}
                    <li className = "h-10 w-full flex items-center justify-between mt-2 hover:bg-gray-100 rounded-2xl">
                        {/**왼쪽에 이미지 + 글 */}
                        <div className = "w-32 h-full flex items-center justify-between">
                            <img src = "https://img.icons8.com/?size=128&id=xLbFcX2vvLii&format=png" className = "h-8 w-8"/>
                            <div className = "font-semibold text-gray-500">자주 묻는 질문</div>
                        </div>
                        {/**오른쪽 꺽쇠 svg */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </li>
                </ul>
            </div>
        </div>
        </>
    )
}
export default ServiceComponent;