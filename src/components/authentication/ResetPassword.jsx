import React,{ useState }from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

function ResetPassword(props){
     let { id } = useParams();
    // const [showPassword, setShowPassword] = useState(false);
    const [data, setData] =useState({
        password: "",
        confirmpassword:"",
            
    })
    // const togglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    //   };
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
    const[changingPass,setChangingPass]=useState(false);
    const handleSubmit =async (event)=>{
        event.preventDefault();
        if(!data.password || !data.confirmpassword){
          alert("Please fill all details");
          return;
        }

        if(data.password!==data.confirmpassword){
          alert("Confirm password is not matching with password.");
          return;
        }
        setChangingPass(true);
        try {
            
            const response = await axios.post(`https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/resetPassword/${id}`, {
              password: data.password,
              confirmpassword: data.confirmpassword,
            });
            console.log(response.data);
            alert("Password reset successful!");
            setChangingPass(false);
        } 
        catch (error) {
            console.error('Error resetting password:', error);
            alert("Failed to reset password, please try again.");
            setChangingPass(false);
        }
    }

    function handleKeyPress(event) {
      if (event.key === 'Enter') {
        handleSubmit(event);
      }
    }

    return(
    <div className='login-position'>
    <div className='login-box-2'>
        <div className='reset-heading'>RESET PASSWORD</div>
          <div className='cont2'>
          <div className="input-field">
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              required
              spellCheck="false"
            />
            <label>New Password</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              value={data.confirmpassword}
              name="confirmpassword"
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              required
              spellCheck="false"
            />
            <label>Confirm Password</label>
          </div>
            </div>
            <button onClick={handleSubmit} className='btn' disabled={changingPass}>
            {changingPass ? (
                <>
                Changing Password....
                <div className="spinner" />
                </>
              ) : (
                "Submit"
              )}
              </button>    
    </div>
    </div>
    )
    
    }
export default ResetPassword
