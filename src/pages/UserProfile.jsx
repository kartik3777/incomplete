import React, { useState, useEffect } from 'react';
// import img from '../components/Faculty/users.png';
import { useNavigate } from 'react-router-dom';
import './UserProfileCss.css';
import axios from 'axios';
import Loader from '../components/Faculty/Loader';
import UserDetails from './userdetails'

const UserProfile=(props)=> {

    const [user, setUser] = useState({
        name: '',
        rollno: '',
        email: '',
        resume: '',
        arrRequested:[],
        arrAccepted:[],
        arrRejected:[]
    }) 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const uniqueId = props.logedInStudentData._id;
            const url = `https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/getuserinfo/${uniqueId}`;
            const response = await axios.get(url);
      
            // Handle the fetched data (e.g., update state or perform other actions)
            //console.log(response);
      
            setUser({
              name: response.data.user.name,
              rollno: response.data.user.rollno,
              email: response.data.user.email,
              resume:response.data.user.resumeLink,
              arrRequested: response.data.user.projectsRequested,
              arrAccepted: response.data.user.projectsEnrolled,
              arrRejected:response.data.user.projectsRejected
            });
           // console.log(user);
            setLoading(false);
           
          } catch (error) {
            console.error('Error fetching student profile:', error);
            setLoading(false);
           
          }
        };
      
        fetchData(); // Call the fetchData function when the component mounts
      }, [props.logedInStudentData._id]);

      if (loading) {
        return <Loader/>; 
      }
    
   return (
    <div className='flexcard8'>
        <div className="profile-container100">
            <div className="profile-section100">
               <h2>Personal Information</h2>
                <div className="profile-info100">
                   <p><strong>Name:</strong> {user.name}</p>
                   <p><strong>Roll No:</strong> {user.rollno}</p>
                   <p><strong>Email:</strong> {user.email}</p>
                   <p><strong>Resume Link:</strong> <a href={user.resume} className="profile-linkedin" target="_blank" rel="noopener noreferrer">See Resume</a></p>
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
                        {user.arrAccepted && user.arrAccepted.map((project,index) => (
                            <tr key={index+1}>
                                <td>{index+1}</td>
                                <td>{project.name}</td>
                                <td>Accepted</td>
                                <td>{project.offeredByProf.name} {/*props.arrAccepted.offeredByProf.name*/ }</td>
                            </tr>
                        ))}
                        {user.arrRequested && user.arrRequested.map((project,index) => (
                            <tr key={index+1+user.arrAccepted.length}>
                                <td>{index+1+user.arrAccepted.length}</td>
                                <td>{project.name}</td>
                                <td>Pending</td>
                                <td>{project.offeredByProf.name}</td>
                            </tr>
                        ))}
                        {user.arrRejected && user.arrRejected.map((project,index) => (
                            <tr key={index+1+user.arrAccepted.length+user.arrRequested.length}>
                                <td>{index+1+user.arrAccepted.length+user.arrRequested.length}</td>
                                <td>{project.name}</td>
                                <td>Rejected</td>
                                <td>{project.offeredByProf.name} {/*props.arrRejected.offeredByProf.name*/ }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
}


export default UserProfile;
