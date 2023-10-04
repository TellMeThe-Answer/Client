import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

// 모달 스타일을 LoginPage 컴포넌트 바깥에서 정의합니다.
const modalStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
};

// 가상의 회원 정보
const users = [
  { email: 'user1@example.com', password: 'password1' },
  { email: 'user2@example.com', password: 'password2' },
  // 추가 회원 정보 추가 가능
];

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      return;
    }
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      console.log('로그인 이메일:', email);
      console.log('로그인 비밀번호:', password);
      setShouldNavigate(true); 
    } else {
      alert('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupEmail.trim() === '' || signupPassword.trim() === '') {
      return;
    }
    users.push({ email: signupEmail, password: signupPassword });
    console.log('회원가입 이메일:', signupEmail);
    console.log('회원가입 비밀번호:', signupPassword);
    setIsSignupModalOpen(false);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div style={{ padding: '50px' }}>
      {shouldNavigate && <Navigate to="/menu-page" />}
      <form onSubmit={handleLoginSubmit}>
        {/* ... 로그인 폼 ... */}
        <div style={{ marginBottom: '10px' }}>
          <label>
            이메일:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
        </div>
        <div style={{ marginBottom: '10px', position: 'relative' }}>
          <label>
            비밀번호:
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingRight: '50px' }}
            />
          </label>
          <button 
            type="button"
            onClick={togglePasswordVisibility}
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {isPasswordVisible ? '숨기기' : '보기'}
          </button>
        </div>
        <button type="submit">로그인</button>
        <button type="button" onClick={() => setIsSignupModalOpen(true)}>회원가입</button>
      </form>

      {isSignupModalOpen && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            {/* ... 회원가입 모달 ... */}
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
              <button type="submit">회원가입</button>
            </form>
            <button onClick={() => setIsSignupModalOpen(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
