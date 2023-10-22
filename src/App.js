import './App.css';
import NavBar from './components/common/footer'
import JoinComponent from './components/LoginAndJoin/JoinComponent'
import LoginComponent from './components/LoginAndJoin/LoginComponent'
import MyPage from './pages/Mypage/Mypage'
import SelectPlantPage from './pages/SelectPlant/SelectPlantPage';

function App() {
  return (
    <div className="App h-screen">
      <SelectPlantPage/>
    </div>
  );
}

export default App;
