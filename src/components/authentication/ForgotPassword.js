import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styl.css';

function ForgotPassword(){
    const [data, setData] =useState({
        email: "",
            
    })

    const [email, setEmail] = useState("");

    
    function handleChange(e){
        const {name, value} = e.target;
        setData((prevValue) => {
             return {
                 ...prevValue,
                 [name] :value
             }
        })
    }

    const handleSubmit =async (event)=>{
        event.preventDefault();

        fetch('https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/forgotPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: data.email }),
        })
        .then(response => {
            if (response.ok) {
                return response.json(); 
            } else {
                throw new Error('Failed to send, please try again');
            }
        })
        .then(data => {
            console.log(data);
            alert("Sent you instructions");
        })
        .catch(error => {
            console.error('Error sending token link:', error);
            alert("Failed to send please try again.");
        });
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
                </div>
                <button onClick={handleSubmit} className='btn'>Submit</button>    
        </div>
        </div>
    )
}

export default ForgotPassword;