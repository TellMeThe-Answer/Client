import './App.css';
import Footer from './components/common/footer'
import MyPage from './pages/Mypage/Mypage'
import SelectPlantPage from './pages/SelectPlant/SelectPlantPage';
import { Routes, Route } from "react-router-dom";
import DiagnosePage from './pages/Diagnose/DignosePage';
import DeclarationPage from './pages/Declaration/DeclarationPage';
import LocationSettingComponent from './components/Declaration/LocationSettingComponent';
import FirstPage from './pages/BeforeLogin/FirstPage';
import LoginPage from './pages/LoginAndJoin/LoginPage';
import JoinPage from './pages/LoginAndJoin/JoinPage';
import DictionaryComponent from './components/Dictionary/DictionaryComponent';
import CropListComponent from './components/Dictionary/CropListComponent';
import MapComponent from './components/Map/MapComponent';
import ForcastPage from './pages/Forcast/ForcastPage';
import DetailComponent from './components/Dictionary/DetailComponent';

function App() {
  
  return (
    <div className="App h-screen bg-gray-50">
        <Routes>
          <Route
          path="/login"
          element={
            <>
              <LoginPage />
            </>
          }
        />
        <Route
          path="/join"
          element={
            <>
              <JoinPage />
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
        <Route
          path="/information"
          element={
            <>
              <CropListComponent />
              <Footer />
            </>
          }
        />
        <Route
          path="/map"
          element={
            <>
              <MapComponent />
              <Footer />
            </>
          }
        />
        <Route
          path="/forcast"
          element={
            <>
              <ForcastPage />
              <Footer />
            </>
          }
        />
          <Route path="/croplist/:cropName" element={<DictionaryComponent />} />
          <Route path = "/" Component = {FirstPage} />
          <Route path = "/inspect" Component = {SelectPlantPage} />
          <Route path = "/diagnose" Component = {DiagnosePage} />
          <Route path = "/declaration" Component = {DeclarationPage} />
          <Route path = "/location" Component = {LocationSettingComponent} />
          <Route path = "/detail" Component = {DetailComponent} />
        </Routes>
    </div>
  );
}

export default App;
