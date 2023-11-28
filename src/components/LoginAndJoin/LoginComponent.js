import React, { useState } from "react";
import Footer from "../common/footer"
import {Link} from 'react-router-dom';
import "./LoginComponent.css"

    

const LoginComponent = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('폼 데이터:', formData);
        localStorage.setItem("email", "iopp3423@gmail.com");
        localStorage.setItem("password", "test1234");
    };  


    return(
        <section class="bg-white h-full flex items-center">
            <div id="loginform">    
                <div className="login-sub-icon-container">
                    <img className="login-sub-icon" src="/images/loginicon.png" alt="식물아이콘"></img>
                </div>
                <div className="login-title">
                    로그인
                </div>
                <div>
                    <div className="row">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="ex) abcd@naver.com"
                            onChange={handleChange} 
                            id="email"
                        />
                    </div>
                    <div className="row">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="ex) 01012345678"
                            onChange={handleChange} 
                            id="password"/>
                    </div>

                    <div className="login-forgot">
                        <Link to='/login' class="font-medium text-[#0f9d6ef9] hover:underline h-100 top-0 right-0 absolute">Forgot password?</Link>

                    </div>
                    <div className="login-button-container">
                        <button
                            type="button"
                            className="w-full h-14 rounded-xl bg-[#10b981] text-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#10b981] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#10b981] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#10b981] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                            로그인
                        </button>
                    </div>
            
                    <div className="or-login-with-container">
                        <span className="or-login-with">Or Login with</span>
                    </div>
                   
                    <div className="oauth">
                        <button className="oauth-button">
                            <img src="./images/facebook.png" alt="facebook" />
                        </button>
                        <button className="oauth-button">
                            <img src="./images/google.png" alt="google" />
                        </button>
                        <button className="oauth-button">
                            <img src="./images/apple.png" alt="google" />
                        </button>
                    </div>

                    <div className=" w-full flex justify-center fixed bottom-0 left-0 mb-7 suggest_signup">
                        <span className="mr-2"> Don’t have an account?</span>
                        <Link to='/join' class="font-medium text-[#10b981] hover:underline"><strong>Join</strong></Link>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default LoginComponent;