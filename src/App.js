import './App.css';
import NavBar from './components/common/footer'
import JoinComponent from './components/LoginAndJoin/JoinComponent'
import LoginComponent from './components/LoginAndJoin/LoginComponent'
import MyPageComponent from './components/MyPage/CheckComponent'
import MyPage from './pages/Mypage/Mypage'
function App() {
  return (
    <div className="App h-screen">
      <LoginComponent/>
    </div>
  );
}

export default App;
