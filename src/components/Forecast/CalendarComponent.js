import React from 'react';


const CalendarComponent = () =>{

    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];


    return(
        <>
            <div className = "h-72 mt-4 p-4">
                <div className = "text-3xl font-semibold mb-3 pl-2">이달의 병해충 예보</div>
                <div className = "text-lg font-semibold text-gray-400 mb-2 pl-2">최근 1년 이내의 병해충 정보를 조회합니다.</div>
                <div class="flex flex-wrap">
                    {months.map((month, index) => (
                    <div key={index} className="w-1/4 p-4 flex justify-center border-2 rounded-xl">
                    {month}
                    </div>
                ))}
                </div>
                <div className = "w-full flex justify-end mt-2">
                    <div className = "flex h-5 items-center mr-2">
                        <div className = "bg-red-500 w-3 h-3 rounded-full "/>
                        <div className="mr-2"/>경보
                    </div>
                    <div className = "flex h-5 items-center mr-2">
                        <div className = "bg-yellow-300 w-3 h-3 rounded-full "/>
                        <div className="mr-2"/>주의보
                    </div>
                    <div className = "flex h-5 items-center">
                        <div className = "bg-green-400 w-3 h-3 rounded-full "/>
                        <div className="mr-2"/>예보
                    </div>
                </div>
            </div>
        </>
    )
}
export default CalendarComponent;