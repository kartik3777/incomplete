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
  const[sendingEmail,setSendingEmail]=useState(false);

  const handleSubmit = async (event) => {

    event.preventDefault();
    if(!data.email){
        alert("Please enter email id to proceed.")
        return;
    }
    setSendingEmail(true);
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
        // console.log(data);
        alert("A Reset link has been sent to your Email adress.");
        setSendingEmail(false);
      })
      .catch((error) => {
        console.error("Error sending token link:", error);
        alert("Failed to send please try again. Ensure that it is the same email with which you are registered.");
        setSendingEmail(false);
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
        <div className="reset-heading">RESET PASSWORD</div>
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
            <label>Enter Your Email</label>
          </div>
        </div>
        <button onClick={handleSubmit} className="btn" disabled={sendingEmail}>
        {sendingEmail ? (
                <>
                Sending....
                <div className="spinner" />
                </>
              ) : (
                "Submit"
              )}
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
