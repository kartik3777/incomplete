import React from "react";
import './Navbar.css';
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { GrProjects } from "react-icons/gr";
import { MdAlternateEmail } from "react-icons/md";
import { ImProfile } from "react-icons/im";

function NavBar(props) {
    const location = useLocation();
    document.documentElement.style.setProperty('--heading-color', 'white');

    if (props.who === "faculty") {
        return (
            <>
                <div className="nav">
                    <div className="heading">
                        <img className="logo" src="./images/iitk.gif" alt="" />
                        <h1>ProfInfo Central</h1>
                    </div>
                    <ul>

                        <li><Link className="a" to="/LogOut">Log Out</Link></li>
                        <li><Link className="a" to="/ContactUs">Contact us</Link></li>
                        <li><Link className="a" to="/Project_list_prof">Projects</Link></li>
                        <li><Link className="a" to="/ProfProfile">Profile</Link></li>
                        <li><Link className="a" to="/Home">Home</Link></li>
                    </ul>

                </div>
                <Outlet />
                {/* <div className="footer">
                    <div className="footertop">
                        <div className="left">
                            <img className="logox" src="./images/iitk.gif" alt="" />
                        </div>
                        <div className="mid ul">
                            <h3>About Us</h3>
                            <p>Explore our CS253 assignment website crafted by CSE students at IITK | <Link className="abc" to="/ContactUs">Contact</Link></p>

                        </div>
                        <div className="right">
                            <h3>Navigate</h3>
                            <ul>
                                <li><MdHome className="icon" /><Link className="abc" to="/">Home</Link></li>
                                <li><IoPersonCircle className="icon" /><Link className="abc" to="/ProfProfile">Profile</Link></li>
                                <li><GrProjects className="icon" /><Link className="abc" to="/Project_list_prof">Projects</Link></li>
                                <li><MdAlternateEmail className="icon" /><Link className="abc" to="/ContactUs">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footerbot">
                        <div className="bot1">
                            <div><Link className="abc" style={{color:"white"}} to="/">Home</Link></div>
                            <div><Link className="abc" style={{color:"white"}} to="/ProfProfile">Profile</Link></div>
                            <div><Link className="abc" style={{color:"white"}} to="/Project_list_prof">Projects</Link></div>
                            <div><Link className="abc" style={{color:"white"}} to="/ContactUs">Contact Us</Link></div>
                        </div>

                    </div>
                </div> */}
            </>
        )
    } else {
        return (
            <>
                <div className="nav">
                    <div className="heading">
                        <img className="logo" src="./images/iitk.gif" alt="" />
                        <h1>ProfInfo Central</h1>
                    </div>
                    <ul>
                        <li><Link className="a" to="/LogOut">Log Out</Link></li>
                        <li><Link className="a" to="/ContactUs">Contact us</Link></li>
                        <li><Link className="a" to="/UserProfile">My Profile</Link></li>
                        <li><Link className="a" to="/Student">Projects</Link></li>
                        <li><Link className="a" to="/Faculty/Cse">Faculty</Link></li>
                        <li><Link className="a" to="/Home">Home</Link></li>
                    </ul>

                </div>
                <Outlet />
                {/* <div className="footer">
                    <div className="footertop">
                        <div className="left">
                            <img className="logox" src="./images/iitk.gif" alt="" />
                        </div>
                        <div className="mid ul">
                            <h3>About Us</h3>
                            <p>Explore our CS253 assignment website crafted by CSE students at IITK | <Link className="abc" to="/ContactUs">Contact</Link></p>

                        </div>
                        <div className="right">
                            <h3>Navigate</h3>
                            <ul>
                                <li><MdHome className="icon" /><Link className="abc" to="/">Home</Link></li>
                                <li><IoPersonCircle className="icon" /><Link className="abc" to="/Faculty/Cse">Faculty</Link></li>
                                <li><GrProjects className="icon" /><Link className="abc" to="/Student">Projects</Link></li>
                                <li><ImProfile className="icon" /><Link className="abc" to="/UserProfile">My Profile</Link></li>
                                <li><MdAlternateEmail className="icon" /><Link className="abc" to="/ContactUs">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footerbot">
                        <div className="bot1">
                            <div><Link className="abc" style={{color:"white"}} to="/">Home</Link></div>
                            <div><Link className="abc" style={{color:"white"}} to="/Faculty/Cse">Faculty</Link></div>
                            <div><Link className="abc" style={{color:"white"}} to="/Student">Projects</Link></div>
                            <div><Link className="abc" style={{color:"white"}} to="/UserProfile">My Profile</Link></div>
                            <div><Link className="abc" style={{color:"white"}} to="/ContactUs">Contact Us</Link></div>
                        </div>

                    </div>
                </div> */}
            </>
        )

    }

}

export default NavBar;





