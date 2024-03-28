import React from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import './prof.css'

function Menu() {

  const navigate = useNavigate();

  function OpenNav(e){
    document.getElementById("mymenu").style.width = "19%";
    document.getElementById("mymenu").style.padding ="5px";
    document.getElementById("faculty-page").style.marginLeft ="19%";
    document.getElementById("open").style.display ="none";
  }
  function CloseNav(){
    document.getElementById("mymenu").style.width = "0px";
    document.getElementById("mymenu").style.padding ="0";
    document.getElementById("faculty-page").style.marginLeft ="0";
    document.getElementById("open").style.display ="block";
  }
  function showDepartment(value){
    console.log(value);
    
  }

  return (
    <>
    <div className="menu-box">
       <span id='open' style= {{fontSize: "40px", cursor:"pointer"}} onClick={OpenNav}>&#9776;</span>
        <ul id='mymenu' className='menu'>
         <li  className="closebtn" onClick={CloseNav}>&times; close</li>
          <li onClick={() => {showDepartment("Computer Science And Engineering")}} className="dabba dabba1"><Link onClick={CloseNav}  id='cse'  to="/Faculty/Cse">Computer Science And Engineering</Link></li>
          <li className="dabba dabba2"><Link onClick={CloseNav} id='ee' to="/Faculty/Ee">Electrical</Link></li>
          <li onClick={() => {showDepartment("Civil Engineering")}} className=" dabba dabba3"><Link onClick={CloseNav} id='ce' to="/Faculty/Ce">Civil Engineering</Link></li>
          <li className="dabba dabba1"><Link onClick={CloseNav} id='che'  to="/Faculty/Che">Chemical Engineering</Link></li>
          <li className="dabba dabba2"><Link onClick={CloseNav} id='dms' to="/Faculty/Dms">Department of Management Sciences</Link></li>
          <li className=" dabba dabba3"><Link onClick={CloseNav} id='ae' to="/Faculty/Ae">Aerospace Engineering</Link></li>
          <li className="dabba dabba1"><Link onClick={CloseNav} id='me'  to="/Faculty/Me">Mechanical Engineering</Link></li>
          <li className="dabba dabba2"><Link onClick={CloseNav} id='mse' to="/Faculty/Mse">Material Science and Engineering</Link></li>
          <li className=" dabba dabba3"><Link onClick={CloseNav} id='phy' to="/Faculty/Phy">Physics</Link></li>
          </ul>

          </div>
          </>
  )
}

function Faculties() {
  return (

    <div className='faculties-back'>
      <Menu />
      <Outlet />
    </div>
  )
}

export default Faculties
