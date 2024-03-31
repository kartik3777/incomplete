import React, { useState, useEffect } from 'react';
// import img from '../components/Faculty/users.png';
import { useNavigate } from 'react-router-dom';
import './UserProfileCss.css';
import UserDetails from './userdetails'

function ProfileCard(props) {
    const navigate = useNavigate();

    const handleDetailsClick =() => {
        navigate('/ProjectDesc');
    };
//     return (
//     <div className="profile-container100">
//       <div className="profile-info100">
//         <h2>My Profile</h2>
//         <p><strong>Name:</strong> {props.name}</p>
//         <p><strong>Roll No:</strong> {props.rollno}</p>
//         <p><strong>Email:</strong> {props.email}</p>
//         <p><strong>LinkedIn Profile:</strong> <a href={props.resume} className="profile-linkedin" target="_blank" rel="noopener noreferrer">Visit Profile</a></p>
//       </div>
//     </div>
//   ); 
   return (
        <div className="profile-container100">
            <div className="profile-section100">
               <h2>Personal Information</h2>
                <div className="profile-info100">
                   <p><strong>Name:</strong> {props.name}</p>
                   <p><strong>Roll No:</strong> {props.rollno}</p>
                   <p><strong>Email:</strong> {props.email}</p>
                   <p><strong>Resume Link:</strong> <a href={props.resume} className="profile-linkedin" target="_blank" rel="noopener noreferrer">See Resume</a></p>
                </div>
            </div>
            <div className="profile-section100">
                <h2>Project History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Sr.No.</th>
                            <th>Project Name</th>
                            <th>Status</th>
                            <th>Professor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.arrAccepted.map((project,index) => (
                            <tr key={index+1}>
                                <td>{index+1}</td>
                                <td>{project.name}</td>
                                <td>Accepted</td>
                                <td>{project.offeredByProf.name} {/*props.arrAccepted.offeredByProf.name*/ }</td>
                            </tr>
                        ))}
                        {props.arrRequested.map((project,index) => (
                            <tr key={index+1+props.arrAccepted.length}>
                                <td>{index+1+props.arrAccepted.length}</td>
                                <td>{project.name}</td>
                                <td>Pending</td>
                                <td>{project.offeredByProf.name}</td>
                            </tr>
                        ))}
                        {props.arrRejected.map((project,index) => (
                            <tr key={index+1+props.arrAccepted.length+props.arrRequested.length}>
                                <td>{index+1+props.arrAccepted.length+props.arrRequested.length}</td>
                                <td>{project.name}</td>
                                <td>Rejected</td>
                                <td>{project.offeredByProf.name} {/*props.arrRejected.offeredByProf.name*/ }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


function UserProfile(props){
  const  myData = props.logedInStudentData
    //   console.log("data in userProfile: "+myData);
      console.log(myData);

    return (
        <div className='flexcard8'>
            
                   <ProfileCard  
                    name  ={myData.name}
                    email = {myData.email}
                    //image = {item.image}
                   resume ={myData.resumeLink}
                    rollno={myData.rollno}
                    arrRequested={myData.projectsRequested}
                    arrAccepted={myData.projectsEnrolled}
                    arrRejected={myData.projectsRejected}
                   />
        </div>
      )
}

export default UserProfile;