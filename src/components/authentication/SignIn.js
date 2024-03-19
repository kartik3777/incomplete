import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styl.css";

function SignIn(props) {
  const [ikartik, setIkartik] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuth, setAuthorized] = useState(false);
  const [iskon, setIsKon] = useState("user");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function handleFaculty() {
    setIsKon("faculty");
    document.getElementById("prof-hai").style.borderTop = "2px solid aqua";
    document.getElementById("bachha-hai").style.borderTop = "none";
  }

  function handleStudent() {
    setIsKon("user");
    document.getElementById("prof-hai").style.borderTop = "none";
    document.getElementById("bachha-hai").style.borderTop = "2px solid aqua";
  }

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Email and password are required!");
      return; // Exit early if validation fails
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
      console.log(ikartik);

      if (resp.status === "success") {
        setEmail("");
        setPassword("");
        setError("");
        setAuthorized(true);
      } else {
        console.log("Authentication failed");
        setError("Incorrect username or password!");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError(
        "An error occurred while processing your request. Please try again later."
      );
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    props.sendDataToParent(isAuth, iskon, ikartik);
    console.log(ikartik);
    console.log(`this is login data that im sending from signinjs ${ikartik}`);
  }, [isAuth, iskon, ikartik]);

  // Attach the event listener to the document
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="login-position">
      <div className="login-box">
        <div className="upar-vale-buttons">
          <button onClick={handleStudent} id="bachha-hai">
            Student
          </button>
          <button id="prof-hai" onClick={handleFaculty}>
            Faculty
          </button>
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
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              spellCheck="false"
            />
            <label>Password</label>
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
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
