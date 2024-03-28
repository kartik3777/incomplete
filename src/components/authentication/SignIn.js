import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styl.css";
import axios from "axios";

function SignIn(props) {
  const [ikartik, setIkartik] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuth, setAuthorized] = useState(false);
  const [iskon, setIsKon] = useState("user");
  const [roll, setRoll] = useState("");
  const [otpFromApi, setOtpFromApi] = useState();
  const [loading, setLoading] = useState(false);

  function handleFaculty() {
    setIsKon("faculty");
    setEmail("");
    setPassword("");
    document.getElementById("prof-hai").style.borderTop = "2px solid aqua";
    document.getElementById("bachha-hai").style.borderTop = "none";
  }

  function handleStudent() {
    setIsKon("user");
    document.getElementById("prof-hai").style.borderTop = "none";
    document.getElementById("bachha-hai").style.borderTop = "2px solid aqua";
    setEmail("");
    setPassword("");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Email and password are required!");
      return; 
    }

    const url =
      "https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/login";
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
      console.log("data of student logging in!!!!!!!!!!");
      console.log(resp.data.user);
      setRoll(resp.data.user.rollno);

      if (resp.status === "success") {
        
        setEmail("");
        setPassword("");
        setError("");
        setAuthorized(true);
      } else {
        console.log("Authentication failed"); // Log failure message
        setError("Incorrect username or password!");
      }
    } catch (error) {
      console.error("An error occurred:", error); // Log the error
      setError(
        "An error occurred while processing your request. Please try again later."
      );
    }
  };
  useEffect(() => {
    // console.log("isAuth:", isAuth);
  }, [isAuth]);

  props.sendDataToParent(isAuth, iskon, ikartik);

  
  function handleOTP() {
    if (!email) {
      alert("Please provide an email address.");
      return;
    }
    fetch(
      "https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json(); 
        } else {
          throw new Error("Failed to send OTP");
        }
      })
      .then((data) => {      
        console.log(data);
        setOtpFromApi(data.otp);
        alert("OTP sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        alert("Failed to send OTP. Please try again.");
      });
  }


  const fetchData = async () => {
    try {
      const uniqueId = email.split("@")[0];
      const url = `https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/professor/login/`;
      const response = await axios.post(url, {
        email: email,
      });
      console.log("when faculty login....");
      console.log(response);
      props.handleProfId(uniqueId);
      // alert("yes, you are there")
      setAuthorized(true);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching faculty data:", error);
      alert("incorrect credentials");
      // setLoading(false);
    }
  };

  function handleFacultyOtp() {
    if (otpFromApi == password) {
      fetchData();
    } else {
      alert("otp does not matched")
      setAuthorized(false);
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      
      handleSubmit(event);
    }
  }
  function handleKeyPress2(event) {
    if (event.key === 'Enter') {
      
      handleOTP();
    }
  }
  function handleKeyPress3(event) {
    if (event.key === 'Enter') {
      handleFacultyOtp();
    }
  }
  

  if (iskon === "user") {
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
                  onKeyPress={handleKeyPress}
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
                  onKeyPress={handleKeyPress}
                  required
                  spellCheck="false"
                />
                <label id="password-label">Password</label>
              </div>

            {error && <div className="error">{error}</div>}
          
          <div className="choose">
            <button id="userLoginButton" className="btns" type="submit" onClick={handleSubmit}>
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
      </div>
    );
  } else {
    return (
      <div className="login-position">
        <div className="login-box">
          <div className="upar-vale-buttons">
            <button onClick={handleStudent} id="bachha-hai">
              Student
            </button>
            <button id="prof-hai" onClick={handleFaculty}>
              faculty
            </button>
          </div>
          <div className="login-heading">Login</div>
          <div className="cont2">
            <div className="input-field">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress2}
                required
                spellCheck="false"
              />
              <label>Enter email</label>
            </div>
            <button onClick={handleOTP} className="otpButton">
              Send OTP
            </button>
            <div className="input-field">
              <input
                // id="password-input"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress3}
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
