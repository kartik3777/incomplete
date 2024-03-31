import React, { useState, useEffect } from "react";
import "./Requests.css";
import Loader from "../components/Faculty/Loader";

const FacultyCard = (props) => {
  // const x = "65f6e6d7b90787bc4fbdbabf";

  return (
    // props.id === x ?
    //   props.registered.length > 0 ?
    props.name ? (
      <div key={props.index} className="facultycard">
        {/* <h2 className='BC'>Project: {props.project}</h2> */}
        <p className="info">Name: {props.name}</p>
        <p className="info">Cpi: {props.cpi}</p>
        <p className="info">Roll Number: {props.rollno}</p>
        <p className="info">Email: {props.email}</p>
        <p className="info">
          Resume link:{" "}
          <a href={props.resumeLink} target="blank">
            {props.resumeLink}
          </a>{" "}
        </p>
        {/* <button  className="accept-button">ACCEPT</button> */}
        <button className="reject-button">Remove Student</button>
      </div>
    ) : (
      <div className="facultycard">
        <h1>No student has requested this project.</h1>
      </div>
    )
    //   : <div className='facultycard'><h1>No student has requested this project.</h1></div>
    // : <div></div>
  );
};

const EnrolledStudents = (props) => {
  const enrolledStudentsList = props.acceptedBachhe;

  const [studentDataArray, setStudentDataArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await fetch(
          `https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/getuserinfo/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const data = await response.json();
        const studentData = {
          name: data.user.name,
          email: data.user.email,
          cpi: data.user.cpi,
          rollno: data.user.rollno,
          _id: data.user._id,
          resumeLink: data.user.resumeLink,
        };
        setStudentDataArray((prevArray) => [...prevArray, studentData]);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    const fetchAllData = async () => {
      await Promise.all(enrolledStudentsList.map((id) => fetchData(id)));
      setLoading(false);
    };

    fetchAllData();
  }, [enrolledStudentsList]);

  if (loading) {
    return <> <Loader /></>;
  }

  const uniqueStudents = Array.from(new Set(studentDataArray.map((student) => student._id)))
    .map((id) => studentDataArray.find((student) => student._id === id));

  return (
    <div>
      <div className="requestContainer">
        {uniqueStudents.map((item, index) => (
          <FacultyCard
            key={index}
            index={index}
            name={item.name}
            email={item.email}
            cpi={item.cpi}
            rollno={item.rollno}
            id={item._id}
            resumeLink={item.resumeLink}
            projectId={props.projectId}
          />
        ))}
      </div>
    </div>
  );
};

export default EnrolledStudents;
