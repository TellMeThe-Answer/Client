import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/login-page';
import MonthPage from './pages/month-page';

/*추가할 항목들
<Route path="/month" exact component={month} />
<Route path="/detect" exact component={detect} />
<Route path="/map" exact component={map} />
<Route path="/dictionary" exact component={dictionary} />
<Route path="/report" exact component={report} />
*/
function App() {
  
  return(
    <Router>
      <div className = "App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/month-page" element={<MonthPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;