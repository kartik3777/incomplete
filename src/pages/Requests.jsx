import React, { useEffect, useState } from 'react';
import './Requests.css';
import axios from 'axios';
import Loader from '../components/Faculty/Loader'



const FacultyCard = (props) => {

 const handleAccept = async () => {
   console.log("project id in raccepting is: "+props.projectId);
  const url = `https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/professor/approveproject/${props.projectId}/${props.rollno}`;
    try {
      const response = await axios.get(
        url
      );
      console.log("Project accepted!!!!!!!!"+ response.data); 
      alert("accepted")    
    } catch (error) {
      console.error("Error accepting a request:", error);
      alert("error in accepting the project")
    }
  }
 const handleReject = async () => {
   console.log("project id in raccepting is: "+props.projectId);
  const url = `https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/professor/rejectproject/${props.projectId}/${props.rollno}`;
    try {
      const response = await axios.get(
        url
      );
      console.log("Project accepted!!!!!!!!"+ response.data); 
      alert("accepted")    
    } catch (error) {
      console.error("Error accepting a request:", error);
      alert("error in accepting the project")
    }
  }

  return (
    // props.id === x ?
      // props.registered.length > 0 ?
        // props.registered.map((student, index) => (
          
            props.name ?  <div key={props.index} className="facultycard">
            {/* <h2 className='BC'>Project: {props.project}</h2> */}
            <p className='info'>Name: {props.name}</p>
            <p className='info'>Cpi: {props.cpi}</p>
            <p className='info'>Roll Number: {props.rollno}</p>
            <p className='info'>Email: {props.email}</p>
            <p className='info'>Resume link: <a href={props.resumeLink}>{props.resumeLink}</a> </p>
            <button onClick={handleAccept} className="accept-button">ACCEPT</button>
            <button onClick={handleReject} className="reject-button">REJECT</button>
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
  console.log("requested called!!");
  console.log(requestedStudentList);


  // const requestedStudentList = props.my; // Replace with your actual list of student IDs
  const [studentDataArray, setStudentDataArray] = useState([]); // Initialize an empty array
  const [loading, setLoading] =useState(true);

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await fetch(`https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/getuserinfo/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        const data = await response.json();
        console.log("this is request data");
        console.log(data);
        // Create a new object with relevant properties from data.user
        const studentData = {
          name: data.user.name,
          email: data.user.email,
          cpi: data.user.cpi,
          rollno: data.user.rollno,
          _id: data.user._id,
          resumeLink: data.user.resumeLink
        };
        // Update the array by adding the new studentData
        setStudentDataArray((prevArray) => [...prevArray, studentData]);
        console.log("Student requested data for ID", id);
        console.log(studentDataArray);
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


  return (
    <div>
      <div className='MC'>
        {/* {requestedData && requestedData.map((item, index) => ( */}
       {/* { useEffect(() => {
        console.log("inside useeffect");
        console.log(id); */}
        {loading ? (
          <Loader /> 
        ): (
            studentDataArray.map((item, index) => {
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
        {/* },[id])} */}
       
        {/* <FacultyCard 
              name ={reqName}
              email ={reqEmail}
              cpi = {cpi}
             rollno ={rollno}
             id={_id} 
              /> */}
        {/* ))} */}
      </div>
    </div>
  );
};

export default Requests;