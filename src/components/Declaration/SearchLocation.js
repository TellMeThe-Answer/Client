import React, { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import {mapLocation} from "../../config/atom";
import {useRecoilState} from "recoil";

const SearchLocation = () => {

    const [openPostcode, setOpenPostcode] = useState(false);
    const [mapAddress, setMapAddress] = useRecoilState(mapLocation);

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
            setMapAddress(data.address);
            console.log(data.address);
        },
    }
  return (
    <>
        <div>
            <button onClick={handle.clickButton}>toggle</button>

            {openPostcode && 
                <DaumPostcode 
                    onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                    autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                    defaultQuery='판교역로 235' // 팝업을 열때 기본적으로 입력되는 검색어 
                    />}
        </div>
    </>
  );
};

export default SearchLocation;
