import React, { useEffect, useState } from 'react';
import './Requests.css';
import axios from 'axios';
import Loader from '../components/Faculty/Loader'



const FacultyCard = (props) => {

  const [accepting, setAccepting] = useState(false);
  const [rejecting, setRejecting] = useState(false);

 const handleAccept = async () => {
  setAccepting(true);
  // console.log("project id in raccepting is: "+props.projectId);
  const url = `https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/professor/approveproject/${props.projectId}/${props.rollno}`;
    try {
      const response = await axios.get(
        url
      );
     // console.log("Project accepted!!!!!!!!"+ response.data); 
      alert("accepted") ;
      setAccepting(false);   
    } catch (error) {
      console.error("Error accepting a request:", error);
      alert("error in accepting the project");
      setAccepting(false);
    }
  }
 const handleReject = async () => {
  setRejecting(true);
  // console.log("project id in raccepting is: "+props.projectId);
  const url = `https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/professor/rejectproject/${props.projectId}/${props.rollno}`;
    try {
      const response = await axios.get(
        url
      );
     // console.log("Project rejected!!!!!!!!"+ response.data); 
      alert("rejected");
      setRejecting(false);    
    } catch (error) {
      console.error("Error rejecting a request:", error);
      alert("error in rejecting the project");
      setRejecting(false);
    }
  }

  return (
    // props.id === x ?
      // props.registered.length > 0 ?
        // props.registered.map((student, index) => (
          
        props.name ?  <div key={props.index} className="facultycard">
        <div className="card-content">
     <h2 className="name">{props.name}</h2>
     <p>
     <span className='headings'>Roll No:</span>
      <span className='info'>{props.rollno}</span>
      </p>
      <p>
     <span className='headings'>Email:</span>
      <span className='info'>{props.email}</span>
      </p>
      <p>
     <span className='headings'>Current CPI:</span>
      <span className='info'>{props.cpi}</span>
      </p>
      <p>
     <span className='headings'>Resume link:</span> <span className='info'><a href={props.resumeLink} target='_blank' rel="noopener noreferrer">{props.rollno}-Resume</a></span>
     </p>
   </div>
   <div className="card-actions">
   <button onClick={handleAccept} className="accept-button" disabled={accepting || rejecting}>
          {accepting ? "Accepting..." : "Accept"}
        </button>
        <button onClick={handleReject} className="reject-button" disabled={accepting || rejecting}>
          {rejecting ? "Rejecting..." : "Reject"}
        </button>
   </div>
       </div>
     :  <div className='facultycard'><h1>No student has requested this project.</h1></div>

 
          
        // ))
      //   : <div className='facultycard'><h1>No student has requested this project.</h1></div>
      // : <div></div>

  );
};


const Requests = (props) => {
  
  const requestedStudentList = props.my;
  // var lengthOfStuddent = requestedStudentList.length;
  var id =requestedStudentList[0] ;
  
  //console.log("requested called!!");
  //console.log(requestedStudentList);
  // const requestedStudentList = props.my; // Replace with your actual list of student IDs
  const [studentDataArray, setStudentDataArray] = useState([]); // Initialize an empty array
  const [loading, setLoading] =useState(true);

  useEffect(() => {
    const fetchData = async (id) => {
     // setLoading(true);
      try {
        const response = await fetch(`https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/getuserinfo/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        const data = await response.json();
       // console.log("this is request data");
        //console.log(data);
        // Create a new object with relevant properties from data.user
        const studentData = {
          name: data.user.name,
          email: data.user.email,
          cpi: data.user.cpi,
          rollno: data.user.rollno,
          _id: data.user._id,
          resumeLink: data.user.resumeLink,
          accepted: data.user.projectsEnrolled
        };
        // Update the array by adding the new studentData
        if(studentData.accepted.length===0){
        setStudentDataArray((prevArray) => [...prevArray, studentData]);
        }
        //console.log("Student requested data for ID", id);
        //console.log(studentDataArray);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching student data:', error);
        setLoading(false);
      }
    };

    requestedStudentList.forEach((id) => {
      fetchData(id);
    });
  }, [requestedStudentList]); // Observe changes in requestedStudentList
  //setLoading(false);
  const flag= studentDataArray.length===0 ;
  const uniqueStudentDataArraySet= new Set();
  studentDataArray.forEach((item) => {
    if(item._id){
      uniqueStudentDataArraySet.add(item);
    }
  });
  const uniqueStudentDataArray = Array.from(uniqueStudentDataArraySet);
  //console.log("length of the array:", uniqueStudentDataArray.length);

if(flag){
    return <h1 style={{textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>There are currently no pending student requests for this project.</h1>
}
else{
  return (
    <div>
      <div className='requestContainer'>
        {loading ? (
          <Loader /> 
        ): (

          uniqueStudentDataArray && uniqueStudentDataArray.map((item, index) => {
            return (
              <FacultyCard 
              key ={index}
              index={index}
              name ={item.name}
              email ={item.email}
              cpi = {item.cpi}
             rollno ={item.rollno}
             id={item._id} 
             resumeLink ={item.resumeLink}
             projectId ={props.projectId}
              />
            )
          }) 
        )} 
      </div>
    </div>
  );
  }
};

export default Requests;
