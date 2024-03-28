import React,{ useState, useEffect, Component }from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function ResetPassword(){
    
    const { id } = useParams(); 
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] =useState({
        password: "",
        confirmpassword:"",
            
    })
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    // const [email, setEmail] = useState("");
  
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

        try {
            const response = await axios.post(`https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/resetPassword/${id}`, {
                password: data.password,
                confirmpassword: data.confirmpassword,
                token:this.props.match.params.id
            });
            console.log(response.data);
            alert("Password reset successful!");
        } catch (error) {
            console.error('Error resetting password:', error);
            alert("Failed to reset password, please try again.");
        }
    }
    return(
    <div className='login-position'>
    <div className='login-box-2'>
        <div className='reset-heading'>RESET PASSWORD</div>
          <div className='cont2'>
          <div className="input-field">
            <input
              type={showPassword ? "text" : "password"}
              value={data.password}
              onChange={handleChange}
              required
              spellCheck="false"
            />
            <label>New Password</label>
          </div>
          <div className="input-field">
            <input
              type={showPassword ? "text" : "password"}
              value={data.confirmpassword}
              onChange={handleChange}
              required
              spellCheck="false"
            />
            <label>Confirm Password</label>
          </div>
            </div>
            <button onClick={handleSubmit} className='btn'>Submit</button>    
    </div>
    </div>
    )
    
    }
export default ResetPassword