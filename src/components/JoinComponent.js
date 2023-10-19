import React, { useState } from "react";
import Footer from "./common/footer"

const JoinComponent = () => {
    return(
        <section class="bg-gray-50 h-full flex items-center">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-black">
                <img class="w-8 h-8 mr-2" src="https://cdn-icons-png.flaticon.com/128/1892/1892751.png" alt="logo"/>
                병해 분류   
            </a>
            <div class="w-full bg-white rounded-lg shadow border border-x-emerald-300 md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        회원가입
                    </h1>
                    <form class="space-y-2 md:space-y-6" action="#">
                        <div className = "mt-6">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">이메일</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-[#10b981] focus:outline-none transition delay-100 block w-full p-2.5 peer ..." placeholder="example@email.com"/>
                            <p class="mt-1 invisible peer-invalid:visible text-[#10b981] text-sm">
                                이메일 형식을 맞춰주세요.
                            </p>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">비밀번호</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-[#10b981] focus:outline-none transition delay-100 block w-full p-2.5" required=""/>
                        </div>
                        <div class="flex items-center justify-between">
                            <a href="#" class="text-sm font-medium text-black hover:underline">계정을 잊으셨나요?</a>
                        </div>
                        <button type="submit" class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">가입하기</button>
                        <p class="text-sm font-light text-gray-600">
                            이미 계정이 있으신가요? 
                            <a href="#" class="font-medium text-[#10b981] hover:underline">로그인</a>
                        </p> 
                    </form>
                </div>
            </div>
        </div>
        <Footer/>
        </section>
    )
}


export default JoinComponent;