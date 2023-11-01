import React, { useState } from "react";
import MoveBackComponent from "../common/MoveBackComponent";
import DaumPostcode from 'react-daum-postcode';

const LocationSettingComponent = () => {

    const [openPostcode, setOpenPostcode] = useState(false);
    const handle = {
        // 버튼 클릭 이벤트
        clickButton: () => {
            setOpenPostcode(current => !current);
        },

        // 주소 선택 이벤트
        selectAddress: (data) => {
            console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}
            `)
            setOpenPostcode(false);
        },
    }

    return(
        <>
        <MoveBackComponent/>
        <div className = "w-full h-12 flex justify-center text-lg font-bold">주소 검색</div>

        <div className = "w-full px-5 pt-5 pb-2 border-b">
            <form>   
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="지번, 도로명, 건물명으로 검색" required/>
                    <button type="submit" onClick={handle.clickButton} class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                </div>
            </form>

            <div className = "flex items-center h-10 mt-2 z-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <div className = "pl-1 pt-1">현재 위치로 설정</div>
            </div>
        </div>

        <div className = "z-10 absolute w-full">
            {openPostcode && 
                <DaumPostcode 
                    onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                    autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                    defaultQuery='판교역로 235' // 팝업을 열때 기본적으로 입력되는 검색어 
                    />}
        </div>

        <div className = "w-full h-full bg-gray-100 py-10 px-5 z-0">

            <div className = "font-bold text-lg mb-2">이렇게 검색해 보세요</div>

            <div className = "h-14">
                <div>도로명 + 건물번호</div>
                <div className = "text-gray-400">군자로 12길 3</div>
            </div>

            <div className = "h-14">
                <div>지역명 + 번지</div>
                <div className = "text-gray-400">군자동 12-3</div>
            </div>

            <div className = "h-14">
                <div>건물명, 아파트명</div>
                <div className = "text-gray-400">레미안 101동</div>
            </div>
        </div>
        </>
    )
}
export default LocationSettingComponent;