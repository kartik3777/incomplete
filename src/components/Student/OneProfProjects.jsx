import { useState, useEffect } from "react";
import React  from 'react'
import axios from "axios";
import Loader from '../Faculty/Loader';

function TotalProjects(props) {
  // console.log(props.rollno);
  const user = {
  };
  const [loading, setLoading] = useState(false);
  
  function expand() {
    const projectDiv = document.getElementById(`project-${props.index}`);
    const button = document.getElementById(`expand-button-${props.index}`);

    if (projectDiv.style.height === "auto") {
      button.innerText = "Show More";
      projectDiv.style.height = "150px";
    } else {
      button.innerText = "Show Less ";
      projectDiv.style.height = "auto";
    }
  }

  


  const handleSubmit = async (e) => {
    if(props.students>=props.maxstudents){
      alert("Regrettably, you cannot apply for this project as the total selected capacity has been reached.");
    }
    if(props.total>=5){
      alert("You have surpassed the limit for requesting projects.");
      return;
    }
    for(let i=0; i<props.arrRequest.length; i++){
      if(props.arrRequest[i]._id==props.index){
        alert("You have already submitted a request for this project.");
        return;
      }
    }
    for(let i=0; i<props.arrAccept.length; i++){
      if(props.arrAccept[i]._id==props.index){
        alert("You are already enrolled in this project.");
        return;
      }
    }
    for(let i=0; i<props.arrReject.length; i++){
      if(props.arrReject[i]._id==props.index){
        alert("The professor has already rejected your request for this project.");
        return;
      }
    }
    const confirmation = window.confirm("Are you sure you want to proceed with this project request? This action cannot be undone.");
    if(!confirmation){
      return ;
    }
    setLoading(true);
    e.preventDefault();
    const btnData = document.getElementById("request-vala-button").innerText;
    if(btnData === "Request"){
       
      try {

        const url = ` https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/${props.logedInStudentData.rollno}/requestproject/${props.index}`;
        //update the roll no and project id in given route
  
        const response = await axios.post(url, user);
        // console.log(response.status);
        setLoading(false);
        if (response.status === 201) {
         // console.log(response);
          document.getElementById("request-vala-button").innerText =  "Requested!!";
          alert("You have succesfully Requested this project!");
          
        } else {
          console.error('Failed to create project');
        }

        
      } catch (error) {
        console.error('Error creating project:', error.message);
        
      }

    }else{
      alert("Already Requested.");
    }
  };


  return (

    <div id={`project-${props.index}`} className="each-project">
      {loading ? (
        <Loader />
      ):(
      <div>
      <h2>{props.name}</h2>
      <button id={`expand-button-${props.index}`} onClick={expand}>
          Show More
      </button>
      <p>{props.details}</p>
      {/* <div className="normal-details"> 
      </div> */}
      <div className="side-karo">
        <div className="expanded-details">
        <span style={{ color: "blue" }}>
          Cpi Required:{" "}
          <span style={{ color: "black", fontWeight: "500", fontSize: "15px" }}>
            {props.cpi}
          </span>
        </span>
        <span style={{ color: "blue" }}>
          Pre-Requisite:{" "}
          <span style={{ color: "black", fontWeight: "500", fontSize: "15px" }}>
            {props.preReq}
          </span>
        </span>
          <span style={{ color: "blue", fontWeight: "530" }}>
            Professor :{" "}
            <span
              style={{ color: "black", fontWeight: "500", fontSize: "15px" }}
            > 
              {props.Name}
            </span>
          </span>

          <span style={{ color: "blue", fontWeight: "530" }}>
            Open for:{" "}
            <span
              style={{ color: "black", fontWeight: "500", fontSize: "15px" }}
            >
              {props.batches}
            </span>
          </span>
          <span style={{ color: "blue", fontWeight: "530" }}>
            Resume Required:{" "}
            <span
              style={{ color: "black", fontWeight: "500", fontSize: "15px" }}
            >
              {props.isResume}
            </span>
          </span>

          <span style={{ color: "blue", fontWeight: "500" }}>
            Students Registered:{" "}
            <span
              style={{ color: "black", fontWeight: "500", fontSize: "15px" }}
            >
              {props.students}/{props.maxstudents}
            </span>
          </span>

        </div>
        </div>
      </div>
      )}
      <div  className="request-button-css"><button id="request-vala-button" onClick={handleSubmit}>Request</button></div>
    </div>
  );
}



function OneProfProjects(props) {

  const [facultyData, setFacultyData] = useState([]);
  const facultyIdForProject = props.facultyIdForProject;
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [user, setUser] = useState({
    arrRequested:[],
    arrAccepted:[],
    arrRejected:[]
  }) 

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(
                  `https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/faculty/${facultyIdForProject}`
              );
              //console.log(response.data);
              setFacultyData(response.data.projects);
          } catch (error) {
              console.error("Error fetching faculty data:", error);
          } finally {
              setLoading(false);
          }
      };

      fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uniqueId = props.logedInStudentData._id;
        const url = `https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/getuserinfo/${uniqueId}`;
        const response = await axios.get(url);
  
        // Handle the fetched data (e.g., update state or perform other actions)
        //console.log(response);
  
        setUser({
          arrRequested: response.data.user.projectsRequested,
          arrAccepted: response.data.user.projectsEnrolled,
          arrRejected:response.data.user.projectsRejected
        });
       // console.log(user);
        setLoading1(false);
       
      } catch (error) {
        console.error('Error fetching student profile:', error);
        setLoading1(false);
       
      }
    };
  
    fetchData(); // Call the fetchData function when the component mounts
  }, [props.logedInStudentData._id]);

  return (
      <div className="outer-background">
          {loading || loading1 ? (
              <Loader />
          ) : (
              <div className="prof-projects-list">
                  <div className="porjects-heading-note">
                      <h2>Ongoing projects:-</h2>
                  </div>

                  {facultyData.length === 0 ? (
                      <h3>No project has been provided by the respected professor.</h3>
                  ) : (
                      facultyData.map((item, index) => (
                          <TotalProjects
                          item={item}
                          std={item.studentsRequested}
                          key={index}
                          index={item._id}
          
                          // index={item.name + index} // Note: You might want to use a unique identifier here
          
                          name={item.name}
                          Name={item.offeredByProf.name}
                          email={item.email}
                          details={item.description}
                          cpi={item.cpirequired}
                          CategoryName={props.CategoryName}
                          category={item.projectCategory}
                          batches={item.openfor}
                          additional={item.Openfor}
                          preReq={item.prereg}
                          resume={item.resumerequired}
                          students={item.studentsEnrolled.length}
                          maxstudents={item.maxstudents}
                          isResume={item.resumerequired}
                          isRequest={item.isRequest}
                          logedInStudentData={props.logedInStudentData}
                          id = {props.ProjectDetails}
                          rollno={props.rollno}
                          total={user. arrRequested.length}
                          arrRequest={user.arrRequested}
                          arrAccept={user.arrAccepted}
                          arrReject={user.arrRejected}
                          />
                      ))
                  )}
              </div>
          )}
      </div>
  );
}

export default OneProfProjects
