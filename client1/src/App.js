import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/login-page';
import MonthPage from './pages/month-page';
import DetectionPage from './pages/detection-page';
import HistoryPage from './pages/history-page';
import DictionaryPage from './pages/dictionary-page';
import MapPage from './pages/map-page';
import ReportPage from './pages/report-page';
/*추가할 항목들


<Route path="/map" exact component={map} />

<Route path="/report" exact component={report} />
*/
function App() {
  
  return(
    <Router>
      <div className = "App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/month-page" element={<MonthPage />} />
          <Route path="/detection-page" element={<DetectionPage />} />
          <Route path="/history-page" element = {<HistoryPage />} />
          <Route path="/dictionary-page" element = {<DictionaryPage />} />
          <Route path="/map-page" element = {<MapPage />} />
          <Route path="/report-page" element={<ReportPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;