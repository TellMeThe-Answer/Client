import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/menu-page" element={<MenuPage />} />
      </Routes>
    </Router>
  );
}

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('로그인 이메일:', email);
    console.log('로그인 비밀번호:', password);
    setShouldNavigate(true);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log('회원가입 이메일:', signupEmail);
    console.log('회원가입 비밀번호:', signupPassword);
    console.log('전화번호:', phone);
    setIsSignupModalOpen(false);
  };

  return (
    <div style={{ padding: '50px' }}>
      {shouldNavigate && <Navigate to="/menu-page" />}
      <form onSubmit={handleLoginSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            이메일:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            비밀번호:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
        </div>
        <button type="submit">로그인</button>
        <button type="button" onClick={() => setIsSignupModalOpen(true)}>
          회원가입
        </button>
      </form>

      {isSignupModalOpen && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h2>회원가입</h2>
            <form onSubmit={handleSignupSubmit}>
              <div style={{ marginBottom: '10px' }}>
                <label>
                  이메일:
                  <input type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
                </label>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>
                  비밀번호:
                  <input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
                </label>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>
                  전화번호:
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </label>
              </div>
              <button type="submit">회원가입</button>
            </form>
            <button onClick={() => setIsSignupModalOpen(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuPage() {
  return (
    <div style={{ padding: '50px' }}>
      <h2>Menu Page</h2>
      <button>버튼 1</button>
      <button>버튼 2</button>
      <button>버튼 3</button>
      <button>버튼 4</button>
    </div>
  );
}

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
};

ReactDOM.render(<App />, document.getElementById('root'));
