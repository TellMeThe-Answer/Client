import './App.css';
import Footer from './components/common/footer'
import MyPage from './pages/Mypage/Mypage'
import SelectPlantPage from './pages/SelectPlant/SelectPlantPage';
import Login from './pages/LoginAndJoin/LoginPage'
import { Routes, Route } from "react-router-dom";
import DiagnosePage from './pages/Diagnose/DiagnosePage';
import DictionaryPage from './pages/Dictionary/DictionaryPage';
import MonthPage from './pages/Month/MonthPage';
import MapPage from './pages/Map/MapPage';
import CropListPage from './pages/Dictionary/CropListPage';
function App() {
  return (
    <div className="App h-screen">
        <Routes>
          <Route
          path="/"
          element={
            <>
              <Login />
              <Footer />
            </>
          }
        />
          <Route
          path="/mypage"
          element={
            <>
              <MyPage />
              <Footer />
            </>
          }
        />
          <Route path = "/inspect" Component = {SelectPlantPage} />
          <Route path = "/diagnose" Component = {DiagnosePage} />
          <Route path = "/dictionary" Component = {DictionaryPage} />
          <Route path = "/home" Component = {MonthPage} />
          <Route path = "/map" Component = {MapPage} />
          <Route path="/croplist/:cropName" element={<CropListPage />} />
        </Routes>
    </div>
  );
}

export default App;