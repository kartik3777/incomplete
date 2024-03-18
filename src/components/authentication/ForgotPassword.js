import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styl.css';

function ForgotPassword(){
    const [data, setData] =useState({
        email: "",
        password: "",
        confirmpassword: "", 
        OTP: "",
    })

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [OTP, setOTP] = useState("");
    const [OTPData, setOTPData] = useState(null);
    
    function handleOTP(){   
        if (!data.email) {
            alert("Please provide an email address.");
            return;
        }
        fetch('https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: data.email }),
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // assuming the response is JSON
            } else {
                throw new Error('Failed to send OTP');
            }
        })
        .then(data => {
            // handle successful response here
            console.log(data);
            setOTP(data); 
            alert("OTP sent successfully!");
        })
        .catch(error => {
            console.error('Error sending OTP:', error);
            alert("Failed to send OTP. Please try again.");
        });
  }

    
    function handleChange(e){
        const {name, value} = e.target;
        if(name ==="OTP"){
         setOTPData(value)
        }
        setData((prevValue) => {
             return {
                 ...prevValue,
                 [name] :value
             }
        })
    }

    function handleClick(){
        if (
            !data.email ||
            !OTP ||
            !data.password ||
            !data.confirmpassword
        ) {
            alert("Please fill all the details");
            return;
        }
    
        if (data.password !== data.confirmpassword) {
            alert("Passwords do not match");
            return;
        }
        setEmail(data.email);
        setPassword(data.password);
        setConfirmpassword(data.confirmpassword);
        setOTP(data.OTP);
    
    if (!OTPData) {
        alert("OTP not received. Please send OTP.");
        return;
    }

    if (data.OTP !== OTPData) {
        alert("OTP verification failed. Please try again.");
        return;
    }

    fetch('https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            // Reset successful
            alert("Successfully changed the password! You can now login.");
            // Optionally, redirect to login page or perform other actions
        } else {
            // Reset failed, handle error
            alert("Registration failed. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error registering user:', error);
        alert("An error occurred while registering. Please try again later.");
    });
    setData(
        {
            email: "",
            password: "",
            confirmpassword: "", 
            OTP: "",
        }
    )
   }

    return(
        <div className='login-position'>
        <div className='login-box-2'>
            <div className='reset-heading'>RESET PASSWORD</div>
              <div className='cont2'>
                 <div className='input-field'>
                    <input  onChange={handleChange} value={data.email} name='email' type="email" required="required" /> 
                    <label>Enter Your Gmail</label>
                 </div>
                 <button onClick={handleOTP} className='otpButton'>Send OTP</button>
                 <div className='input-field'>
                    <input  onChange={handleChange} value={data.OTP} name='OTP' type="text" required="required" /> 
                    <label>Enter OTP</label>
                 </div>
                 <div className='input-field'>
                    <input  onChange={handleChange} value={data.password} name='password' type="password" required="required" /> 
                    <label>Create-Password</label>
                 </div>
                 <div className='input-field'>
                    <input onChange={handleChange} value={data.confirmpassword} name='confirmpassword' type="password" required="required" /> 
                    <label>Confirm-Password</label>
                 </div>
                </div>
                <button onClick={handleClick} className='btn'>Reset Password</button>    
        </div>
        </div>
    )
}

export default ForgotPassword;