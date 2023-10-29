import './App.css';
import Footer from './components/common/footer'
import MyPage from './pages/Mypage/Mypage'
import SelectPlantPage from './pages/SelectPlant/SelectPlantPage';
import Login from './pages/LoginAndJoin/LoginPage'
import { Routes, Route } from "react-router-dom";
import DiagnosePage from './pages/Dignose/DignosePage';

function App() {
  return (
    <div className="App h-screen">
        <Routes>
          <Route path="/" Component={Login} />
          <Route path = "/mypage" Component = {SelectPlantPage} />
          <Route path = "/diagnose" Component = {DiagnosePage} />
        </Routes>
        {/**<Footer/>*/}
    </div>
  );
}

export default App;
