import React from 'react';
import CalendarComponent from '../../components/Forecast/CalendarComponent';
import AlcodianComponent from '../../components/Forecast/AlcordianComponent';

const ForcastPage = () => {
    return(
        <div className="w-full h-full bg-gray-50 pl-4 pr-4">
            <CalendarComponent/>
            <AlcodianComponent/>
        </div>
    )
}

export default ForcastPage