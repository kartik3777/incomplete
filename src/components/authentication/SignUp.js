import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styl.css';

function SignUp() {
    const [data, setData] = useState({
        name: '',
        rollno: '',
        email: '',
        department: '',
        cpi: '',
        resumeLink: '',
        password: '',
        confirmpassword: '',
        OTP: '',
    });

    const [OTPData, setOTPData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    const handleOTP = () => {
        if (!data.email) {
            alert('Please provide an email address.');
            return;
        }
        fetch('https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: data.email }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to send OTP');
                }
            })
            .then((data) => {
                setOTPData(data);
                alert('OTP sent successfully!');
            })
            .catch((error) => {
                console.error('Error sending OTP:', error);
                alert('Failed to send OTP. Please try again.');
            });
    };

    const handleClick = () => {
        if (
            !data.name ||
            !data.rollno ||
            !data.email ||
            !data.OTP ||
            !data.department ||
            !data.cpi ||
            !data.resumeLink ||
            !data.password ||
            !data.confirmpassword
        ) {
            alert('Please fill all the details');
            return;
        }

        if (data.password !== data.confirmpassword) {
            alert('Passwords do not match');
            return;
        }

        if (!OTPData || !OTPData.otp) {
            alert('OTP not received. Please send OTP first.');
            return;
        }

        if (data.OTP !== OTPData.otp) {
            alert('OTP verification failed. Please try again.');
            return;
        }

        fetch('https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Successfully registered! You can now login.');
                } else {
                    alert('Registration failed. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error registering user:', error);
                alert('An error occurred while registering. Please try again later.');
            });
        setData({
            name: '',
            rollno: '',
            email: '',
            department: '',
            cpi: '',
            resumeLink: '',
            password: '',
            confirmpassword: '',
            OTP: '',
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {    
            handleClick();
        }
    };
    
    useEffect(() => {
        // Add event listener when component mounts
        document.body.addEventListener('keydown', handleKeyDown);

        // Cleanup: Remove event listener when component unmounts
        return () => {
            document.body.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleClick]); // Include handleClick in the dependency array to ensure up-to-date reference

    return (
        <>
            <div className="login-position">
                <div className="login-box-2">
                    <div className="login-heading">REGISTER</div>
                    <div className="cont2">
                        <div className="input-field">
                            <input
                                onChange={handleChange}
                                value={data.name}
                                name="name"
                                type="text"
                                required="required"
                                onKeyDown={handleKeyDown}
                            />
                            <label>Student Name</label>
                        </div>
                        <div className="input-field">
                            <input
                                onChange={handleChange}
                                value={data.rollno}
                                name="rollno"
                                type="number"
                                required="required"
                                onKeyDown={handleKeyDown}
                            />
                            <label>Roll No</label>
                        </div>
                        <div className="input-field">
                            <input
                                onChange={handleChange}
                                value={data.email}
                                name="email"
                                type="email"
                                required="required"
                                onKeyDown={handleKeyDown}
                            />
                            <label>Enter Your IITK Mail-Id</label>
                        </div>
                        <button className="otpButton" onClick={handleOTP}>
                            Send OTP
                        </button>
                        <div className="input-field">
                            <input
                                onChange={handleChange}
                                value={data.OTP}
                                name="OTP"
                                type="text"
                                required="required"
                                onKeyDown={handleKeyDown}
                            />
                            <label>Enter OTP</label>
                        </div>
                        <div className="input-field">
                            <input
                                onChange={handleChange}
                                value={data.department}
                                name="department"
                                type="text"
                                required="required"
                                onKeyDown={handleKeyDown}
                            />
                            <label>Department</label>
                        </div>
                        <div className="input-field">
                            <input onChange={handleChange} value={data.cpi} name="cpi" type="text" required="required" />
                            <label>Cpi</label>
                        </div>
                        <div className="input-field">
                            <input
                                onChange={handleChange}
                                value={data.resumeLink}
                                name="resumeLink"
                                type="text"
                                required="required"
                                onKeyDown={handleKeyDown}
                            />
                            <label>Resume drive link</label>
                        </div>
                        <div className="input-field">
                            <input
                                onChange={handleChange}
                                value={data.password}
                                name="password"
                                type="password"
                                required="required"
                                onKeyDown={handleKeyDown}
                            />
                            <label>Create-Password</label>
                        </div>
                        <div className="input-field">
                            <input
                                onChange={handleChange}
                                value={data.confirmpassword}
                                name="confirmpassword"
                                type="password"
                                required="required"
                                onKeyDown={handleKeyDown}
                            />
                            <label>Confirm-Password</label>
                        </div>
                    </div>
                    <Link id="login-link" className="a" to="/">
                        <button onClick={handleClick} className="btn">
                            SignUp
                        </button>
                    </Link>
                    <div className="sign-karo-box">
                        <span id="backtologin">
                            <p id="already-registered">Already Registered?</p>
                        </span>
                        <Link id="login-link" className="a" to="/">
                            SignIn
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;