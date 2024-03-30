import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styl.css";

function ForgotPassword(props) {
  const [data, setData] = useState({
    email: "",
  });

//   const [email, setEmail] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  const handleSubmit = async (event) => {

    event.preventDefault();
    if(!data.email){
        alert("Please enter email id to proceed")
        return;
    }

    fetch(
      "https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/forgotPassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to send, please try again");
        }
      })
      .then((data) => {
        console.log(data);
        alert("A Reset link has been sent to your Email adress.");

         //\\
        //  \\
        // here change the data.token name according to data coming from api

        console.log("token from api is: "+ data.resetToken );
        props.getToken(data.resetToken);
        //  props.getToken("cc6fbbf18567274b8f27f37652fc90893efeea8733fa21cbec02c026ec01b1e5");
      })
      .catch((error) => {
        console.error("Error sending token link:", error);
        alert("User not registered");
      });
  };

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  }

  return (
    <div className="login-position">
      <div className="login-box-2">
        <div className="reset-heading">Reset Password</div>
        <div className="cont2">
          <div className="input-field">
            <input
              onChange={handleChange}
              value={data.email}
              onKeyPress={handleKeyPress}
              name="email"
              type="email"
              required="required"
            />
            <label>Enter Your Email id</label>
          </div>
        </div>
        <button onClick={handleSubmit} className="btn">
          Submit
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
