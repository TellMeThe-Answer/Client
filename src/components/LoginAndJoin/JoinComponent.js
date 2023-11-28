import React, { useState } from "react";
import Footer from "../common/footer"
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

const JoinComponent = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rePassword: '',
      });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    };      
 
        
    const onClickRegister = async (e) => {
        e.preventDefault();

        const data = {
            email: formData.email,
            password: formData.password
        };
        
        await axios.post('member/signup', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('POST 요청 성공:', response.data);
            navigate('/login')
        })
        .catch(error => {
            console.error('POST 요청 실패:', error.response.data.message);
        });
    }



    return(
        <section class="bg-white h-full flex items-center">
            <div id="loginform">    
                <div className="login-sub-icon-container">
                    <img className="login-sub-icon" src="/images/loginicon.png" alt="식물아이콘"></img>
                </div>
                <div className="login-title">
                    회원가입
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
                        <label>Create a password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="ex) **********"
                            onChange={handleChange} 
                            id="password"/>
                    </div>
                    <div className="row">
                        <label>Confirm password</label>
                        <input
                            type="rePassword"
                            name="rePassword"
                            placeholder="ex) **********"
                            onChange={handleChange} 
                            id="rePassword"/>
                    </div>
                    <div className="mt-10"></div>
                  
                    <div className="login-button-container">
                        <button
                            type="button"
                            className="w-full h-14 rounded-xl bg-[#10b981] text-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#10b981] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#10b981] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#10b981] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                            onClick={onClickRegister}>
                            가입하기
                        </button>
                    </div>
            
                    <div className="or-login-with-container">
                        <span className="or-login-with">OrRegister with</span>
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
                        <span className="mr-2"> Already have an account? </span>
                        <Link to='/login' class="font-medium text-[#10b981] hover:underline"><strong>Log in</strong></Link>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default JoinComponent;