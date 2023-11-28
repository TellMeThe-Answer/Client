import React from 'react';
import CalendarComponent from '../../components/Forecast/CalendarComponent';

const ForcastPage = () => {
    return(
        <div className="w-full h-full bg-gray-50 pl-4 pr-4 overflow-auto">
            <CalendarComponent/>
        </div>
    )
}

export default ForcastPage