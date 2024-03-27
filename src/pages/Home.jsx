import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  return (
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
  );
}

export default Home;
