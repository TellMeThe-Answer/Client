import React, { useState } from "react";
import {Link} from 'react-router-dom'

const AccountComponent = () => {
    return(
        <>
        <div className = "bg-white w-full h-52 rounded-xl mt-4 p-5 drop-shadow-md ...">
            <div className = "w-full h-full">
                <div className = "flex justify-between">
                    <div className = "font-bold text-xl">계정</div>
                </div>
                <ul className = "h-3/4 w-full">
                    {/**신고내역 */}
                    <li className = "h-10 w-full flex items-center justify-between mt-2 hover:bg-gray-100 rounded-2xl">
                        {/**왼쪽에 이미지 + 글 */}
                        <div className = "w-24 h-full flex items-center justify-between">
                            <img src = "https://img.icons8.com/?size=512&id=44020&format=png" className = "h-8 w-8"/>
                            <Link to='/history' className = "font-semibold text-gray-500">신고내역</Link> 
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
                            <img src = "https://img.icons8.com/?size=128&id=4uul8RsD9D9K&format=png" className = "h-8 w-8"/>
                            {/**<img src = "https://img.icons8.com/?size=128&id=4uul8RsD9D9K&format=png" className = "h-8 w-8"/> */}
                            <div className = "font-semibold text-gray-500">비밀번호 변경</div>
                        </div>
                        {/**오른쪽 꺽쇠 svg */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </li>

                    {/**왼쪽에 이미지 + 글 */}
                    <Link to='/' className = "font-semibold text-gray-500"> 
                    <li className = "h-10 w-full flex items-center justify-between mt-2 hover:bg-gray-100 rounded-2xl">
                        {/**왼쪽에 이미지 + 글 */}
                        <div className = "w-24 h-full flex items-center justify-between">
                            <img src = "https://img.icons8.com/?size=160&id=875YZQzHsTV6&format=png" className = "h-8 w-8"/>
                            <div className = "font-semibold text-gray-500">로그아웃</div>
                        </div>
                        {/**오른쪽 꺽쇠 svg */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </li>
                    </Link>
                </ul>
            </div>
        </div>
        </>
    )
}
export default AccountComponent;