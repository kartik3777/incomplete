import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './project_list_prof.css'
import {Link } from "react-router-dom";
import Loader from '../components/Faculty/Loader'

function TotalProjects(props) {
 
  function handleReq(){
    // setStudentReq(props.studentsRequested);
    // console.log("inside handleReq");
    // console.log(props.studentsRequested);
    props.req(props.studentsRequested);
    // props.getProjectId(props.projectId);
    console.log("request button clicked");
    setTimeout(function () {
      props.getProjectId(props.projectId);
      console.log('project id sended after 2s');
      console.log(props.projectId);
    }, 2000);
  }

  function handleEnrolled(){
   // setStudentReq(props.studentsRequested);
    // console.log("inside handleReq");
    // console.log(props.studentsRequested);
    console.log("enrolled clicked");
    props.en(props.studentsEnrolled);
    console.log("student enrolled sended from project list");
    console.log(props.studentsEnrolled);
    // props.getProjectId(props.projectId);
    console.log("enrolled clicked");
    setTimeout(function () {
      props.getProjectId(props.projectId);
      console.log('project id sended after 2s');
      console.log(props.projectId);
    }, 2000);
  }


  console.log("inside total projects "+ props.projectId);
  // console.log("students requestedd");
  // console.log(props.studentsRequested);
  const [showDetails, setShowDetails] = useState(false);
  

// Expand function
  const expand = () => {
    const projectDiv = document.getElementById(`project-${props.index}`);
    const button = document.getElementById(`expand-button-${props.index}`);
    if(projectDiv.style.height === 'auto'){
      button.innerText ="Show More";
      projectDiv.style.height = '200px';
    }
    else{
      button.innerText ="Show Less ";
      projectDiv.style.height = 'auto';
    }
    setShowDetails(!showDetails);
  };


  // delete function
  const DeleteKaro = async () => {
    const badBtn =  document.getElementById("delete-vala-btn").innerText;
    if(badBtn === "Delete"){
      const id = props.projectId;
      //65f3aa5e975d1df0ecd948a1
      console.log(id);
      console.log("inside delete function");
      const url = `https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/professor/deleteproject/${id}`;
      const response = await axios.delete(url);
      alert(response.data.message);
      document.getElementById("delete-vala-btn").innerText ="Deleted!";
      console.log(response);
    }else{
      alert("project deleted!!");
    }
  
  }

  return (
    <div className={`each-project ${showDetails ? 'expanded' : ''}`} id={`project-${props.index}`}>
      <h2>{props.name}</h2>
     
      <p>{props.details}</p>
      <div className="normal-details">
      <Link className="a" to="/EnrolledStudents"><button onClick={handleEnrolled} >Enrolled Students</button></Link>
      <Link className="a" to="/Requests"><button onClick={handleReq}>Requests</button></Link>
        
        
        <button id={`expand-button-${props.index}`} onClick={expand}>{showDetails ? "Show Less" : "Show More"}</button>
      </div>
      {showDetails && (
        <div className="side-karo">
          <div className='expanded-details'>
            <span style={{ color: 'blue', fontWeight: "530" }}>Open for: <span style={{ color: 'black', fontWeight: "500", fontSize: "15px" }}>{props.batches}</span></span>
            <span style={{ color: 'blue', fontWeight: "500" }}>Resume required: <span style={{ color: 'black', fontWeight: "500", fontSize: "15px" }}>{props.resume}</span></span>
            <span style={{ color: 'blue', fontWeight: "500" }}>Total Students: <span style={{ color: 'black', fontWeight: "500", fontSize: "15px" }}>{props.totalEnrolled}/{props.students}</span></span>
            <span style={{ color: 'blue', fontWeight: "500" }}>Project Category: <span style={{ color: 'black', fontWeight: "500", fontSize: "15px" }}>{props.projectCategory}</span></span>
          </div>
          <div className="second-details">
            <h4 style={{ color: 'blue' }}>Cpi Required: <span style={{ color: 'black', fontWeight: "500", fontSize: "15px" }}>{props.cpi}</span></h4>
            <h4 style={{ color: 'blue' }}>Pre-Requisite: <span style={{ color: 'black', fontWeight: "500", fontSize: "15px" }}>{props.preReq}</span></h4>
          </div>
          <div className="editing">
            {/* <button>Edit</button> */}
            <button id='delete-vala-btn' onClick={DeleteKaro} >Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}




function Project_list_prof(props) {


  const [facultyData, setFacultyData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const fetchData = async () => {
    try {
      const uniqueID = props.profId;
      console.log("unique id in projects listsis: "+ uniqueID);
      const url = `https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/faculty/${uniqueID}`;
      const response = await fetch(url); //"abhas" should be replaced by "unique id" of professor signed in
      if (!response.ok) {
        throw new Error('Failed to fetch faculty data');
      }
      const data = await response.json();
      setFacultyData(data);
      console.log("data in prof project list");
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching faculty data:', error);
      setLoading(false); //chnaged true from false
    }
  };
  


  fetchData();
  // useEffect(() => {
  
  //   fetchData();
  // }, []);

  // if (loading) {
  //   return <Loader />;
  // }


  return (
    <div>
      <div className="prof-projects-list">
        <div className="porjects-heading-note">
          <h2>Ongoing projects:-</h2>
          <Link className="a" to="/NewProject">
            <button>Add New Project</button>
          </Link>
        </div>
        {loading ? ( 
        <Loader  />
      ) : (
        facultyData.projects && facultyData.projects.map((item, index) => (
          
          <TotalProjects
            key={index}
            index={index}
            name={item.name}
            details={item.description}
            cpi={item.cpirequired}
            projectCategory ={item.projectCategory}
            batches={item.openfor}
            preReq={item.prereg} // Joining prerequisites array into a comma-separated string
            resume={item.resumerequired ? 'Yes' : 'No'}
            students={item.maxstudents}
            projectId ={item._id}
            studentsRequested = {item.studentsRequested}
            studentsEnrolled ={item.studentsEnrolled}
            totalEnrolled={item.studentsEnrolled.length}
            req = {props.req}
            en ={props.en}
            getProjectId ={props.getProjectId}
          />
        ))
      )}
      </div>
    </div>
  );
}

export default Project_list_prof;
