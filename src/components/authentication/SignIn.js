import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styl.css";
import axios from "axios";
import Loader from '../Faculty/Loader'

function SignIn(props) {
 const [ikartik, setIkartik] = useState(null);
  // const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuth, setAuthorized] = useState(false);
  const [iskon, setIsKon] = useState("user");
  const [roll, setRoll] = useState("");
  const [otpFromApi, setOtpFromApi] = useState();
  const [loading, setLoading] = useState(false);
 

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  function handleFaculty() {
    setIsKon("faculty");
    setEmail("");
    setPassword("");
    document.getElementById("prof-hai").style.borderTop ="2px solid aqua";
    document.getElementById("bachha-hai").style.borderTop ="none";
  }

  function handleStudent(){
    setIsKon("user");
    document.getElementById("prof-hai").style.borderTop ="none";
    document.getElementById("bachha-hai").style.borderTop ="2px solid aqua";
    setEmail("");
    setPassword("");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Email and password are required!");
      return; // Exit early if validation fails
    }
    setLoading(true);

    const url = "https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/login";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const resp = await response.json();
      setIkartik(resp.data.user);
      // console.log(ikartik);
      setRoll(resp.data.user.rollno);

      if (resp.status === "success") {
        // Clear input fields after successful authentication
        setEmail("");
        setPassword("");
        setError("");
        // console.log("API call successful"); // Log success message
        setAuthorized(true);
        setLoading(false);
        // console.log(isAuth);
        // props.sendDataToParent(isAuth);
      } else {
        console.log("Authentication failed"); 
        setLoading(false);// Log failure message
        setError("Incorrect username or password!");
      }
    } catch (error) {
      console.error("An error occurred:", error); 
      setLoading(false);// Log the error
      setError(
        "An error occurred while processing your request. Please try again later."
      );
    }
  };
  useEffect(() => {
    // console.log("isAuth:", isAuth);
  }, [isAuth]);

  props.sendDataToParent(isAuth, iskon, ikartik);


  function handleOTP(){   
    if (!email) {
        alert("Please provide an email address.");
        return;
    }
    fetch('https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
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
        setOtpFromApi(data.otp)
        // setOTPData(data); 
        alert("OTP sent successfully!");
    })
    .catch(error => {
        console.error('Error sending OTP:', error);
        alert("Failed to send OTP. Please try again.");
    });
}

const fetchData = async () => {
  try {
   const uniqueId =  email.split('@')[0];
   const url = `https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/faculty/${uniqueId}`
   const response = await axios.get(url);

    // const data = await response.json();
    console.log(response);
   
    props.handleProfId(uniqueId);
    alert("yes, you are there")
    // setLoading(false);
  } catch (error) {
    console.error('Error fetching faculty data:', error);
    alert("not registered");
    // setLoading(false);
  }
};

function handleFacultyOtp(){
   
  if(otpFromApi == password){
 
       fetchData();
  

      setAuthorized(true);

  }else{
    setAuthorized(false);
  }
 
}



  if(iskon ==="user"){
     
    return (
      <div className="login-position">
        {loading ? (
        <Loader />
      ):(
        <div className="login-box">
          <div className="upar-vale-buttons">
            <button onClick={handleStudent} id="bachha-hai">Student</button>
            <button id="prof-hai" onClick={handleFaculty}>faculty</button>
          </div>
          <div className="login-heading">Login</div>
          <div className="cont2">
            <div className="input-field">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                spellCheck="false"
              />
              <label>Enter email</label>
            </div>
            <div className="input-field">
              <input
              
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                spellCheck="false"
              />
              <label id="password-label">Password</label>
            </div>
          </div>
          {error && <div className="error">{error}</div>}
  
          <div className="choose">
            <button className="btns" type="submit" onClick={handleSubmit}>
              Login
            </button>
          </div>
          <div className="btm">
            <Link className="a" to="/SignUp">
              New Student? SignUp
            </Link>
            <Link className="a1" to="/ForgotPassword">
              ForgotPassword?
            </Link>
          </div>
        </div>
        )}
      </div>
    );

  }else{
    return (
      <div className="login-position">
        <div className="login-box">
          <div className="upar-vale-buttons">
            <button onClick={handleStudent} id="bachha-hai">Student</button>
            <button id="prof-hai" onClick={handleFaculty}>faculty</button>
          </div>
          <div className="login-heading">Login</div>
          <div className="cont2">
            <div className="input-field">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                spellCheck="false"
              />
              <label>Enter email</label>
              
            </div>
            <button onClick={handleOTP} className='otpButton'>Send OTP</button>
            <div className="input-field">
              <input
              // id="password-input"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                spellCheck="false"
              />
              <label id="password-label">Enter otp</label>
            </div>
          </div>
          {error && <div className="error">{error}</div>}
  
          <div className="choose">
            <button className="btns" type="submit" onClick={handleFacultyOtp}>
              Login
            </button>
          </div>
          <div className="btm">
            <Link className="a" to="/SignUp">
              New Student? SignUp
            </Link>
            <Link className="a1" to="/ForgotPassword">
              ForgotPassword?
            </Link>
          </div>
        </div>
      </div>
    );
  }



}

export default SignIn;








// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./styl.css";

// function SignIn(props) {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isAuth, setAuthorized] = useState(false);
//   const [iskon, setIsKon] = useState("user");
//   const [loginData, setLoginData] = useState({});

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   function handleFaculty() {
//     setIsKon("faculty");
//     // if(isAuth) {
//     //   props.sendDataToParent(isAuth, iskon);
//     // }
//     document.getElementById("prof-hai").style.borderTop ="2px solid aqua";
//     document.getElementById("bachha-hai").style.borderTop ="none";
//   }
//   function handleStudent(){
//     document.getElementById("prof-hai").style.borderTop ="none";
//     document.getElementById("bachha-hai").style.borderTop ="2px solid aqua";
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!email || !password) {
//       setError("Email and password are required!");
//       return; // Exit early if validation fails
//     }

//     const url = "https://cs253backederror404teamnotfoundmohamm-kartiks-projects-297f2e09.vercel.app/api/user/login";
//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       setLoginData(data);
//       console.log(data);

//       if (data.status === "success") {
//         // Clear input fields after successful authentication
//         setEmail("");
//         setPassword("");
//         setError("");
//         // console.log("API call successful"); // Log success message
//         setAuthorized(true);
//         // console.log(isAuth);
//         // props.sendDataToParent(isAuth);
//       } else {
//         console.log("Authentication failed"); // Log failure message
//         setError("Incorrect username or password!");
//       }
//     } catch (error) {
//       console.error("An error occurred:", error); // Log the error
//       setError(
//         "An error occurred while processing your request. Please try again later."
//       );
//     }
//   };
//   useEffect(() => {
//     // console.log("isAuth:", isAuth);
//   }, [isAuth]);

//   props.sendDataToParent(isAuth, iskon, loginData);
//   // console.log(`this is login data that im sending from signinjs ${loginData}`);

//   return (
//     // <div className="my-login-page">
//     //   <div className="my-login-box">
//     //   <div className='my-login-heading'>Login</div>
//     //   <div className="my-login-cont">
//     //      <div className="my-input-box">
//     //      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required spellCheck="false" />
//     // //         <label>Enter email</label>
//     //      </div>
//     //      <div className="my-input-box">
//     //      <input className='second-input-field' type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required spellCheck="false" />
//     // //         <label>Password</label>
//     //      </div>
//     //   </div>
//     //   </div>

//     // </div>

//     <div className="login-position">
//       <div className="login-box">
//         <div className="upar-vale-buttons">
//           <button onClick={handleStudent} id="bachha-hai">Student</button>
//           <button id="prof-hai" onClick={handleFaculty}>faculty</button>
//         </div>
//         <div className="login-heading">Login</div>
//         <div className="cont2">
//           <div className="input-field">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               spellCheck="false"
//             />
//             <label>Enter email</label>
//           </div>
//           <div className="input-field">
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               spellCheck="false"
//             />
//             <label>Password</label>
//           </div>
//         </div>
//         {error && <div className="error">{error}</div>}

//         <div className="choose">
//           <button className="btns" type="submit" onClick={handleSubmit}>
//             Login
//           </button>
//         </div>
//         <div className="btm">
//           <Link className="a" to="/SignUp">
//             New Student? SignUp
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignIn;
