// LoginPage.js
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// 모달 스타일을 LoginPage 컴포넌트 바깥에서 정의합니다.
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

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('로그인 이메일:', email);
    console.log('로그인 비밀번호:', password);
    // 로그인 로직을 여기에 추가하면 됩니다.
    // 예를 들어, 서버로 이메일과 비밀번호를 전송하고 인증을 수행하는 등의 작업을 수행합니다.
    // 로그인에 성공하면 setShouldNavigate(true);를 호출하여 페이지를 이동시킬 수 있습니다.
    setShouldNavigate(true); // 임시로 true 설정

    // 아래는 예시 코드로 로그인에 성공하면 메뉴 페이지로 이동하는 예시입니다.
    // 실제 프로젝트에서는 서버와의 통신 등을 통해 로그인을 처리해야 합니다.
    // if (로그인 성공) {
    //   setShouldNavigate(true);
    // }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log('회원가입 이메일:', signupEmail);
    console.log('회원가입 비밀번호:', signupPassword);
    setIsSignupModalOpen(false);
  };

  const navigate = useNavigate();

  const goToMenuPage = () => {
    navigate('/menu-page');
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
          {/* 회원가입 모달 내용 */}
          <h2>회원가입</h2>
          <form onSubmit={handleSignupSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <label>
                이메일:
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>
                비밀번호:
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </label>
            </div>
            <button type="submit">회원가입</button>
          </form>
          <button onClick={() => setIsSignupModalOpen(false)}>닫기</button>
        </div>
      )}
    </div>
  );
}

export default LoginPage;