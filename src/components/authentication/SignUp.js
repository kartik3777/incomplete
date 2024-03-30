import React, { useState } from 'react'
import { Link } from 'react-router-dom';
// import nodemailer from 'nodemailer';
// const nodemailer = require('nodemailer');
import './styl.css'

function SignUp(){

    function handleOTP(){   
        if (!data.email) {
            alert("Please provide an email address.");
            return;
        }
        setLoadingOTP(true);
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
            setOTPData(data); 
            alert("OTP sent successfully!");
            setLoadingOTP(false);
        })
        .catch(error => {
            console.error('Error sending OTP:', error);
            alert("Failed to send OTP. Please try again.");
            setLoadingOTP(false);
        });
        
  }


   const [data, setData] =useState({
       name:"",
       rollno : "",
       email: "",
       department: "",
       cpi: "",
       resumeLink:"",
       password: "",
       confirmpassword: "",
       
   })

   const [OTP, setOTP] = useState("");
   const [OTPData, setOTPData] = useState(null);
   const [loadingOTP, setLoadingOTP] = useState(false);

   function handleChange(e){
   const {name, value} = e.target;
   if(name ==="OTP"){
    setOTP(value)
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
        !data.name ||
        !data.rollno ||
        !data.email ||
        !OTP ||
        !data.department||
        !data.cpi ||
        !data.resumeLink ||
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

    setOTP(data.OTP);
    
    if (!OTPData || !OTPData.otp) {
        alert("OTP not received. Please send OTP first.");
        return;
    }

    if (data.OTP !== OTPData.otp) {
        alert("OTP verification failed. Please try again.");
        return;
    }
    
    fetch('https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            // Registration successful
            alert("Successfully registered! You can now login.");
            // Optionally, redirect to login page or perform other actions
        } else {
            // Registration failed, handle error
            alert("Registration failed. Please try again.");

        }
    })
    .catch(error => {
        console.error('Error registering user:', error);
        alert("An error occurred while registering. Please try again later.");
    });
    setData(
        {
            name:"",
            rollno : "",
            email: "",
            department:"",
            cpi: "",
            resumeLink: "",
            password: "",
            confirmpassword: "",
            // OTP:"",
            
        }
    )
   }

   function handleKeyPress(event) {
    if (event.key === 'Enter') {
        handleClick();
    }
  }
   function handleKeyPress2(event) {
    if (event.key === 'Enter') {
        handleOTP();
    }
  }

    return(
        <>
        <div className='login-position'>
        <div className='login-box-2'>
            <div className='login-heading'>Register</div>
              <div className='cont2'>
                 <div className='input-field' >
                    <input   onKeyPress={handleKeyPress} onChange={handleChange} value={data.name} name='name' type="text" required="required" />
                    <label>Student Name</label>
                 </div>
                 <div className='input-field'>
                    <input    onKeyPress={handleKeyPress} onChange={handleChange} value={data.rollno} name='rollno' type="number" required="required" /> 
                    <label>Roll No</label>
                 </div>
                 <div className='input-field'>
                    <input  onKeyPress={handleKeyPress2} onChange={handleChange} value={data.email} name='email' type="email" required="required" /> 
                    <label>Enter Your IITK Mail-Id</label>
                 </div>
                 <button onClick={handleOTP} className='otpButton' disabled={loadingOTP}>
                 {loadingOTP ? (
                <>
                Sending....
                <div className="spinner" />
                </>
              ) : (
                "Send OTP"
              )}
                 </button>
                 <div className='input-field'>
                    <input  onKeyPress={handleKeyPress} onChange={handleChange} value={OTP} name='OTP' type="text" required="required" /> 
                    <label>Enter OTP</label>
                 </div>
                 <div className='input-field'>
                    <input  onKeyPress={handleKeyPress} onChange={handleChange} value={data.department} name='department' type="text"required="required"/> 
                    <label>Department</label>
                 </div>
                 <div className='input-field'>
                    <input  onKeyPress={handleKeyPress} onChange={handleChange} value={data.cpi} name='cpi' type="text"required="required"/> 
                    <label>Cpi</label>
                 </div>
                 <div className='input-field'>
                      <input  onKeyPress={handleKeyPress} onChange={handleChange} value={data.resumeLink} name='resumeLink' type="text" required="required"/> 
                      <label>Resume drive link</label>
                 </div>
             
                   <div className='input-field'>
                       <input  onKeyPress={handleKeyPress} onChange={handleChange} value={data.password} name='password' type="password" required="required" /> 
                       <label>Create-Password</label>
                   </div>
                   <div className='input-field'>
                        <input  onKeyPress={handleKeyPress} onChange={handleChange} value={data.confirmpassword} name='confirmpassword' type="password" required="required" /> 
                        <label>Confirm-Password</label>
                   </div>
                </div>
                <Link id="login-link" className="a" to="/"><button onClick={handleClick} className='btn'>SignUp</button></Link>
                
                <div className="sign-karo-box">
                 <span id="backtologin"> <p id="already-registered">Already Registered?</p>
                  </span>
                   <Link id="login-link" className="a" to="/">SignIn</Link>
                   </div>
                 
            </div>
            </div>
        </>
    )
}
export default SignUp