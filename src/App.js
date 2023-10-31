import './App.css';
import Footer from './components/common/footer'
import MyPage from './pages/Mypage/Mypage'
import SelectPlantPage from './pages/SelectPlant/SelectPlantPage';
import Login from './pages/LoginAndJoin/LoginPage'
import { Routes, Route } from "react-router-dom";
import DiagnosePage from './pages/Diagnose/DignosePage';
import DeclarationComponent from './components/Declaration/DeclarationComponent';
import DeclarationPage from './pages/Declaration/DeclarationPage';


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
          <Route path = "/declaration" Component = {DeclarationPage} />
        </Routes>
    </div>
  );
}

export default App;
