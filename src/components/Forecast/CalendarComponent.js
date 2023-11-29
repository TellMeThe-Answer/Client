import React, {useState, useEffect} from 'react';
import data from '../../config/forcast.json';

const CalendarComponent = () =>{

    const [selectedMonth, setSelectedMonth] = useState(null);
    const [crops, setCrops] = useState({});
    const [openDiseaseIndex, setOpenDiseaseIndex] = useState(null); // To track which crop's diseases are displayed
    const [state, setState] = useState();

    const handleMonthClick = (month) => {
        setSelectedMonth(month);
        const monthData = data[month];
        const combinedCrops = {
        ...monthData.예보.reduce((acc, crop) => ({ ...acc, [crop.작물]: { ...crop, type: '예보' } }), {}),
        ...monthData.주의보.reduce((acc, crop) => ({ ...acc, [crop.작물]: { ...crop, type: '주의보' } }), {})
        };
        setCrops(combinedCrops);
        setOpenDiseaseIndex(null); // Reset the open diseases
    };

    const handleCropClick = (index, cropName) => {
        // Toggle the display of the diseases for the selected crop
        setOpenDiseaseIndex(openDiseaseIndex === index ? null : index);
        setState(cropName);
    };

    return(
        <>
            <div className = "h-72 mt-4 p-4">
                <div className = "text-3xl font-semibold mb-4 pl-2">이달의 병해충 예보</div>
                <div className = "text-lg font-semibold text-gray-400 mb-2 pl-2">최근 1년 이내의 병해충 정보를 조회합니다.</div>

                <div className="flex flex-wrap">
                {Object.keys(data).reverse().map((month, index) => (
                    <button 
                    key={index}
                    onClick={() => handleMonthClick(month)}
                    className={selectedMonth === month ? 'w-1/4 p-4 flex justify-center border-2 border-[#10b981] rounded-xl' : 'w-1/4 p-4 flex justify-center border-2 rounded-xl'}
                    >
                    {month}
                    </button>
                ))}
                </div>
                
                <div className = "w-full flex justify-end mt-4 mb-8">
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
                
                <div className = "flex ml-2">
                    {selectedMonth && <img src = "https://cdn-icons-png.flaticon.com/128/3239/3239337.png" className = "w-7 h-7"/>}
                    {selectedMonth && <h1 className = "font-semibold text-lg text-warning-900 ml-2 mb-2">{selectedMonth} 작물</h1>}
                </div>

                <div className="w-full flex flex-col items-start">
                    {Object.entries(crops).map(([cropName, cropDetails], index) => (
                    <React.Fragment key={index}>
                        <button
                        onClick={() => handleCropClick(index, cropName)}
                        className={state === cropName ? "w-full h-12 bg-violet-300 rounded-xl flex justify-start items-center pl-5 mt-1 transition-all duration-300" : "w-full h-12 border-2 border-violet-300 rounded-xl flex justify-start items-center pl-5 mt-1 transition-all duration-300"}
                        >
                        {cropName}
                        </button>

                        {openDiseaseIndex === index && (

                        <div className="w-full flex flex-col items-start px-6 mb-1">

                            {cropDetails.질병.map((disease, diseaseIndex) => (
                            <button key={diseaseIndex} className="w-full border-b-2 h-10">
                            {/**<span className={`circle ${cropDetails.type === '예보' ? 'advisory' : 'warning'}`}></span>*/}

                            {cropDetails.type === '예보' ? 
                            <div className = "flex h-5 items-center mr-2">
                                <div className = "bg-green-400 w-3 h-3 rounded-full "/>
                                <div className="mr-2"/>{disease}
                            </div>
                            :
                            <div className = "flex h-5 items-center mr-2">
                                <div className = "bg-yellow-300 w-3 h-3 rounded-full "/>
                                <div className="mr-2"/>{disease}
                            </div>
                            }

                            </button>
                            ))}

                        </div>

                        )}
                    </React.Fragment>
                    ))}
                </div>
            </div>
        </>
    )
}
export default CalendarComponent;