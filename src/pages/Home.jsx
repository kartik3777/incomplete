import React, { useState, useEffect, useRef } from 'react'
import "./Home.css";
import { Link } from "react-router-dom";
import { motion, useInView, useAnimation } from 'framer-motion';

function Home() {

  const ref = useRef(null);
  const isInView = useInView(ref, {once: true})
  const mainControls = useAnimation();
  // let logoItem = useRef('hello');
  // console.log(logoItem);
  useEffect(() => {
    console.log(isInView);
   if(isInView){
mainControls.start("visible")
   }

  }, [isInView])



  function handleHover(e){
    console.log(e);
   document.getElementById("third-button").style.color ="blue";
   document.getElementById("third-button").style.backgroundColor ="white";
  }
  function handleLeave(){
    document.getElementById("third-button").style.color ="white";
    document.getElementById("third-button").style.backgroundColor ="blue";
  }
  function handleHover2(e){
    console.log(e);
   document.getElementById("third-button2").style.color ="#f51f9c";
   document.getElementById("third-button2").style.backgroundColor ="white";
  }
  function handleLeave2(){
    document.getElementById("third-button2").style.color ="white";
    document.getElementById("third-button2").style.backgroundColor ="#f51f9c";
  }
  function handleHover3(e){
    console.log(e);
   document.getElementById("third-button3").style.color ="#b50edf";
   document.getElementById("third-button3").style.backgroundColor ="white";
  }
  function handleLeave3(){
    document.getElementById("third-button3").style.color ="white";
    document.getElementById("third-button3").style.backgroundColor ="#b50edf";
  }

  return (
    <>
    <motion.div
    variants={{
      hidden: {opacity: 0, y: 100},
      visible: {opacity: 1, y: 0},
    }}
    initial="hidden"
    animate="visible"
    transition={{duration: 0.7, delay:0.25}}


     className="container18">
      <div className="row8">
        <h1 className="display-48 mb-5">Welcome to <span>Student</span> dashboard!!</h1>
        {/* <span className="message1">
          Start your journey towards excellence by finding projects that match
          your interests and skills.
        </span> */}
        <p className="lead8">
        "Discover a curated array of research endeavors spanning AI to environmental science. Explore exciting insights and discoveries, welcoming enthusiasts, fellow researchers, and potential collaborators to dive into diverse disciplines and projects."
        </p>
        <div className="explore_buttons_home">
          <Link to="/Student">
            <button className="explore-project">Explore Projects</button>
          </Link>
          <Link to="/Faculty/Cse">
            <button className="explore-faculty">Explore Faculty</button>
          </Link>
        </div>
      </div>
      <div className="home-img">
        <motion.img 
         variants={{
          hidden: {opacity: 0, y: 100},
          visible: {opacity: 1, y: 0},
        }}
        initial="hidden"
        animate="visible"
        transition={{duration: 1, delay:0.35}}

        src="images/home_image_2.png" alt="" />
      </div>
    </motion.div>
     <div className="outer-second-home">
      <h1>What we offers</h1>
    <div className="second-home-page">
      <motion.div 
          variants={{
            hidden: {opacity: 0, y: 126, x: -100},
            visible: {opacity: 1, y: 0, x: 0},
          }}
          initial="hidden"
          animate= {mainControls}
          transition={{duration: 0.8, delay:0.25}}
          ref={ref}
      className="short-card">
        <div className="chnage-kiya" >
          <div className="do-div-1">
             <img src="images/second-back-hai-2.png" alt="" />
          </div>
          <div className="khali-hai"></div>
          <div  onMouseEnter={handleHover} onMouseLeave={handleLeave}  className="do-div-2">
          On the faculty page, you can access list of professors categorized by branches. Should you wish to explore faculty data from a different branch, simply navigate to the menu bar and select your desired branch. Upon selecting a faculty member, you will find details about the projects they offer. If you meet the criteria, you can request to participate in a project.
          <br />
          <Link to="/Faculty/Cse">
          <button id="third-button">Faculty</button>
          </Link>
        
          </div>
        </div>
      </motion.div>
      <motion.div
    variants={{
      hidden: {opacity: 0, y: 126},
      visible: {opacity: 1, y: 0},
    }}
    initial="hidden"
    animate= {mainControls}
    transition={{duration: 0.8, delay:0.25}}
    ref={ref}
       className="short-card">
      <div className="chnage-kiya" >
          <div className="do-div-1">
          <img src="images/second-back-hai.png" alt="" />
          </div>
          <div className="khali-hai"></div>
          <div  onMouseEnter={handleHover2} onMouseLeave={handleLeave2}  className="do-div-2 dusra-vala">
          Within the Projects section, various categories of projects offered by professors at IITK are available. Each category contains projects listed under it. Prerequisites for application are specified, and if you meet the criteria, you can request to join a project. Subsequently, the professor will review your details to either accept or reject your request.
          <br />
          <Link to="/Student">
          <button id="third-button2">Projects</button>
          </Link>
          
          </div>
        </div>
      </motion.div>
      <motion.div
          variants={{
            hidden: {opacity: 0, y: 126, x:100},
            visible: {opacity: 1, y: 0, x:0},
          }}
          initial="hidden"
          animate= {mainControls}
          transition={{duration: 0.8, delay:0.25}}
          ref={ref}
      className="short-card">
      <div className="chnage-kiya" >
          <div className="do-div-1">
          <img src="images/second-back-hai-5.png" alt="" />
          </div>
          <div className="khali-hai"></div>
          <div onMouseEnter={handleHover3} onMouseLeave={handleLeave3} className="do-div-2 teesra-vala">
          Your profile page displays your personal details and a list of requested projects. It also indicates the status of each project, whether accepted, rejected, or pending. This comprehensive overview allows you to efficiently manage your project requests and stay informed about their progress within the system.
          <br />
          <Link to="/UserProfile">
          <button id="third-button3">My Profile</button>
          </Link>
         
          </div>

        </div>
        
      </motion.div>
    </div>
    </div>
   

    </>
  );
}

export default Home;
