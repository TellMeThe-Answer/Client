import './App.css';
import Footer from './components/common/footer'
import MyPage from './pages/Mypage/Mypage'
import SelectPlantPage from './pages/SelectPlant/SelectPlantPage';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App h-screen">
        <Routes>
          <Route path="/" Component={MyPage} />
          <Route path = "/mypage" Component = {MyPage} />
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
