import React, { useState } from "react";
import MoveBackComponent from "../common/MoveBackComponent";
import DaumPostcode from 'react-daum-postcode';
import CurrentLocation from "./CurrentLocation";
import HashLoader from "react-spinners/HashLoader";
import {Link} from 'react-router-dom';
import {mapLocation} from "../../config/atom";
import {useRecoilState} from "recoil";

const LocationSettingComponent = () => {
    const [color, setColor] = useState("#10b981");

    const [openPostcode, setOpenPostcode] = useState(false);
    const [address, setAddress] = useState();
    const [zonecode, setZoneCode] = useState();
    const [searchAddress, setSearchAddress] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(false);

    const [mapAddress, setMapAddress] = useRecoilState(mapLocation);
    

    const handle = {
        // 버튼 클릭 이벤트
        clickButton: () => {
            setOpenPostcode(current => !current);

            {/**상세 주소 입력 */}
            setSearchAddress(false);
            {/**지도 닫기 */}
            setCurrentAddress(false)
        },

        // 주소 선택 이벤트
        selectAddress: (data) => {
            console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}`)
            console.log(data)
            setAddress(data.address);
            setZoneCode(data.zonecode);
            
            {/**검색해서 주소 설정 닫기 */}
            setOpenPostcode(false);
            {/**지도 닫기 */}
            setCurrentAddress(false);
            {/**상세 주소 입력 */}
            setSearchAddress(true);
            {/**주소 저장 */}
            setMapAddress(data.address)
        },
    }

    const openMap = () =>{
        {/**상세 주소 입력 */}
        setSearchAddress(false);
        {/**지도 열기*/}
        setCurrentAddress(true)
        {/**검색해서 주소 설정 닫기 */}
        setOpenPostcode(false);
    }

    const [inputValue, setInputValue] = useState(''); // 초기값은 빈 문자열

    const handleInputChange = (e) => {
        setInputValue(e.target.value); // 입력 값이 변경될 때마다 상태 업데이트
    }

    const setMapLocation = () =>{
        {/**주소 저장 */}
        setAddress(mapAddress)
        {/**상세 주소 입력 */}
        setSearchAddress(true);
        {/**지도 닫기 */}
        setCurrentAddress(false);
    }

    const map = () =>{
        if(currentAddress){
            return (
                <>
                <CurrentLocation/>
                    <div className = "w-full flex justify-center fixed bottom-0 left-0 mb-4 z-10">
                        <button
                            onClick={setMapLocation}
                            type="button"
                            className="w-full h-14 inline-block rounded-xl bg-[#10b981] mx-10 pb-1.5 pt-2 text-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#10b981] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#10b981] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#10b981] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                            이 위치로 주소 설정
                        </button>
                    </div>
                </>  
            )
        }
        if(searchAddress){
            return (
                <>
                <div className = "w-full h-60 bg-gray-50">
                    <div className = "w-full h-full p-5">
                        <div className = "text-xl font-semibold mb-1">{address}</div>
                        <div><span className = "text-gray-500 bg-gray-200 rounded-xl text-xs p-1">우편번호</span> : {zonecode}</div>
        
                        <div class="relative mt-6 border rounded-lg border-black">
                        <input 
                            type="text" 
                            id="floating_outlined" 
                            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                            value={inputValue} 
                            onChange={handleInputChange}
                        />
                            <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-0 bg-white px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">상세 주소 입력</label>
                        </div>
                    </div>
                </div> 
        
                {/** 버튼 */}
                <Link to='/declaration'  className = "w-full flex justify-center fixed bottom-0 left-0 mb-4">
                    <button
                        type="button"
                        className="w-full h-14 inline-block rounded-xl bg-[#10b981] mx-10 pb-1.5 pt-2 text-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#10b981] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#10b981] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#10b981] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                        주소 등록
                    </button>
                </Link>
                </>
            )
        }
        else{
            return(
                <>
                <div className = "w-full h-full bg-gray-50 py-10 px-5 z-0">
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
    }

    return(
        <>
        <MoveBackComponent/>
        <div className = "w-full h-12 flex justify-center text-lg font-bold">주소 검색</div>

        <div className = "w-full px-5 pt-5 pb-2 border-b">
            <form>   
                <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#7be8c4] focus:border-[#7be8c4]" placeholder="지번, 도로명, 건물명으로 검색" required/>
                    <button onClick={handle.clickButton} className="text-[#10b981] absolute right-2.5 bottom-2.5 border border-[#10b981] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">주소검색</button>
                </div>
            </form>

            <div className = "flex items-center h-10 mt-2 z-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <div className = "pl-1 pt-1" onClick={openMap}>현재 위치로 설정</div>
            </div>
        </div>

        <div className = "z-10 absolute w-full">
            {openPostcode && 
                <DaumPostcode 
                    onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                    autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                    defaultQuery='세종대학교' // 팝업을 열때 기본적으로 입력되는 검색어 
            />}
        </div>

        {/** 
        <HashLoader
        color={color}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        />
        */}

        {map()}
        </>
    )
}
export default LocationSettingComponent;