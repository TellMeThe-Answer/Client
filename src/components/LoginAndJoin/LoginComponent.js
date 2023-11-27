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
                <div id="login-logo">
                    <div className="login-image-container">
                        <img className='login-logo-image' 
                            src="/images/logo_rev.png" alt='로고사진'/>
                    </div>
                   
                </div>
                <div>
                    <div className="row">
                        <label>User Name</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="ex) abcd@naver.com"
                            onChange={handleChange} 
                            id="email"
                        />
                    </div>
                    <div className="row">
                        <label>Phone Number</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="ex) 01012345678"
                            onChange={handleChange} 
                            id="password"/>
                    </div>
                    <div id="login-button" className="row">
                        <button className='login-button'  type="submit" onClick={handleSubmit}>미팅 참여</button>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default LoginComponent;