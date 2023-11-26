import React, { useState } from "react";
import Footer from "../common/footer"
import {Link} from 'react-router-dom';
import "./css/LoginComponent.css"

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
        <section class="bg-gray-50 h-full flex items-center">
        <div className="login-container">
            sdf
        </div>
        </section>
    )
}


export default LoginComponent;