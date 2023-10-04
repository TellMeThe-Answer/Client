// LoginPage.js
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BigTitle, BigBtn, EmptyArea } from "../components/components";
// 모달 스타일을 LoginPage 컴포넌트 바깥에서 정의합니다.
const modalStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const modalContentStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "80%",
};
// 가상의 회원 정보
const users = [
  { email: "user1@example.com", password: "password1" },
  { email: "user2@example.com", password: "password2" },
  // 추가 회원 정보 추가 가능
];
function LoginInput({ type, label, value, onChange }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <div>
        <label>{label}</label>
      </div>
      <div class="input-login-area">
        <input class="input-login" type={type} value={value} onChange={onChange} required />
      </div>
    </div>
  );
}

function PasswordInput({ label, value, onChange, isPasswordVisible, toggleVisibility }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <div>
        <label>{label}</label>
      </div>
      <div className="input-login-area" style={{ position: 'relative' }}>
        <input 
          className="input-login" 
          type={isPasswordVisible ? "text" : "password"} 
          value={value} 
          onChange={onChange} 
          required 
        />
        <button 
          type="button" 
          style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={toggleVisibility}
        >
          <i className={`fa ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`} />
        </button>
      </div>
    </div>
  );
}
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // 입력값 검증
    if (email.trim() === "" || password.trim() === "") {
      // 이메일 또는 비밀번호가 비어있으면 로그인을 막습니다.
      return;
    }
    // 입력한 이메일과 비밀번호와 일치하는 회원 정보 찾기
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      // 회원 정보가 일치하면 로그인 성공
      console.log("로그인 이메일:", email);
      console.log("로그인 비밀번호:", password);
      setShouldNavigate(true); // 로그인 성공 시 페이지 이동
    } else {
      // 회원 정보가 일치하지 않으면 로그인 실패
      alert("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // 입력값 검증
    if (signupEmail.trim() === "" || signupPassword.trim() === "") {
      // 회원가입 이메일 또는 비밀번호가 비어있으면 회원가입을 막습니다.
      return;
    }
    // 회원 가입 정보 추가
    users.push({ email: signupEmail, password: signupPassword });
    console.log("회원가입 이메일:", signupEmail);
    console.log("회원가입 비밀번호:", signupPassword);
    setIsSignupModalOpen(false);
  };
  const navigate = useNavigate();
  const goToMenuPage = () => {
    navigate("/month-page");
  };
  return (
    <div style={{ padding: "50px" }}>
      {shouldNavigate && <Navigate to="/month-page" />}
      <BigTitle ttl="로그인" />
      <EmptyArea />
      <form onSubmit={handleLoginSubmit}>
        <LoginInput type="email" label="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput 
          label="비밀번호" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          isPasswordVisible={showPassword}
          toggleVisibility={() => setShowPassword(!showPassword)}
        />
        <EmptyArea />
        <BigBtn ttl="로그인" type="submit" />
        <BigBtn ttl="회원가입" type="button" onClick={() => setIsSignupModalOpen(true)} />
      </form>
      {isSignupModalOpen && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h2>회원가입</h2>
            <form onSubmit={handleSignupSubmit}>
              <LoginInput type="email" label="이메일" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
              <PasswordInput 
                label="비밀번호" 
                value={signupPassword} 
                onChange={(e) => setSignupPassword(e.target.value)}
                isPasswordVisible={showSignupPassword}
                toggleVisibility={() => setShowSignupPassword(!showSignupPassword)}
              />
              <BigBtn ttl="회원가입" type="submit" />
            </form>
            <BigBtn ttl="닫기" type="button" onClick={() => setIsSignupModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginPage;