import React, { useEffect, useState } from 'react';
import './Requests.css';
import axios from 'axios';
import Loader from '../components/Faculty/Loader'
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
const FacultyCard = (props) => {
  // const x = "65f6e6d7b90787bc4fbdbabf";

  // console.log(props.registered.length);
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
            <button className="accept-button">ACCEPT</button>
            <button className="reject-button">REJECT</button>
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


  // const [reqName, setReqName] = useState("");
  // const [reqEmail, setReqEmail] = useState("");
  // const [rollno, setRollNo] = useState("");
  // const [cpi, setCpi] = useState("");
  // const [_id, setId] = useState("");

  // useEffect(() => {
  //   const fetchData = async (id) => {
  //     try {
  //       const response = await fetch(`https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/getuserinfo/${id}`);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch OneUserData data');
  //       }
  //       const data = await response.json();
  //       // setRequestedData((prevData) => [...prevData, data.user]);
  //       // setRequestedData(data.user);
  //       console.log("Student requested data for ID", id);
  //       console.log(data.user);
  //       setReqName(data.user.name);
  //       setReqEmail(data.user.email);
  //       setCpi(data.user.cpi);
  //       setRollNo(data.user.rollno)
  //       setId(data.user._id);
  //       // console.log(requestedData);
  //     } catch (error) {
  //       console.error('Error fetching faculty data:', error);
  //     }
  //   };

  //   // requestedStudentList.forEach((id) => {
  //     for(var i=0; i<lengthOfStuddent; i++){
  //       id = requestedStudentList[i];
  //       fetchData(id);
  //     }
     
  //   // });
  // }, [id]); // Observe changes in 
  // const [requestedData, setRequestedData] = useState(null);

  // for(var i=0; i<requestedStudentList.length;i++){
  //   const id = requestedStudentList[i];
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(`https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/getuserinfo/${id}`);// change abhas with props.uniqueID
  //         if (!response.ok) {
  //           throw new Error('Failed to fetch faculty data');
  //         }
  //         const data = await response.json();
  //         setRequestedData(data);
  //         console.log("faculty data");
  //         console.log(data);
  //       } catch (error) {
  //         console.error('Error fetching faculty data:', error);
  //       }
  //     };
  
  //     fetchData();
  //   }, []);
  // }

  // if(loading){
  //   return <Loader /> ;
  // }



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