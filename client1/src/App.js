import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login-page';
import MonthPage from './pages/month-page';
import DetectionPage from './pages/detection-page';
import HistoryPage from './pages/history-page';
import DictionaryPage from './pages/dictionary-page';
import MapPage from './pages/map-page';
import ReportPage from './pages/report-page';
import MyPage from './pages/my-page';
import CropListPage from './pages/CropListPage';
import ReportAddressPage from './pages/reportaddress-page';
import SingoPage from './pages/singo-page';

function App() {
  const [address, setAddress] = useState('');

  return (
      
          <Router>
              <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/month-page" element={<MonthPage />} />
                  <Route path="/detection-page" element={<DetectionPage />} />
                  <Route path="/history-page" element={<HistoryPage />} />
                  <Route path="/dictionary-page" element={<DictionaryPage />} />
                  <Route path="/map-page" element={<MapPage />} />
                  <Route path="/report-page" element={<ReportPage />} />
                  <Route path="/my-page" element={<MyPage />} />
                  <Route path="/croplist/:cropName" element={<CropListPage />} />
                  <Route path="/reportaddress-page" element={<ReportAddressPage />} />
                  <Route path="/singo-page" element={<SingoPage />} /> {/* SingoPage 라우트 설정 */}
              </Routes>
          </Router>
      
  );
}

export default App;
