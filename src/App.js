import './App.css';
import Footer from './components/common/footer'
import MyPage from './pages/Mypage/Mypage'
import SelectPlantPage from './pages/SelectPlant/SelectPlantPage';
import Login from './pages/LoginAndJoin/LoginPage'
import { Routes, Route } from "react-router-dom";
import DiagnosePage from './pages/Diagnose/DignosePage';
import LoginComponent from './components/LoginAndJoin/LoginComponent'
import DeclarationPage from './pages/Declaration/DeclarationPage';
import LocationSettingComponent from './components/Declaration/LocationSettingComponent';
import CurrentLocation from './components/Declaration/CurrentLocation';
import SearchLocation from './components/Declaration/SearchLocation';

function App() {
  return (
    <div className="App h-screen">
        <Routes>
          <Route
          path="/"
          element={
            <>
              <LoginComponent />
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
          <Route path = "/declaration" Component = {DeclarationPage} />
          <Route path = "/location" Component = {LocationSettingComponent} />
        </Routes>
    </div>
  );
}

export default App;
