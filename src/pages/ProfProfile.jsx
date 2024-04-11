import React, { useState, useEffect } from 'react';
import "./ProfProfile.css";
import axios from 'axios';
import Loader from '../components/Faculty/Loader';

const ProfProfile = (props) => {
const [user, setUser] = useState({
  name: '',
  department: '',
  email: '',
  office: '',
  researchWork: '',
})
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const uniqueId = props.profId;
      const url = `https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/faculty/${uniqueId}`;
      const response = await axios.get(url);

      // Handle the fetched data (e.g., update state or perform other actions)
     // console.log(response.data);

      setUser({
        name: response.data.name,
        department: response.data.department,
        email: response.data.email,
        office: response.data.address,
        researchWork: response.data.research,
      });
      //console.log(user);
      setLoading(false);
     
    } catch (error) {
      console.error('Error fetching faculty profile:', error);
      setLoading(false);
    }
  };

  fetchData(); // Call the fetchData function when the component mounts
}, [props.profId]); // Run the effect whenever props.profId changes
   
if (loading) {
  return <Loader/>; 
}
  
  return (
    <div className='Container'>
      <div style={{ backgroundColor: 'white', height: '100vh' }}>
        <div className="container1" >
          <div className="row justify-content-center align-items-center h-100">
            <div className="col655">
              <div className="cardmb-3" style={{ borderRadius: '.5rem' }}>
                <div className="row g-0">
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h2>{user.name}</h2>
                      <p className="mb-3" >{user.department}</p>
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <p className="mb-0">Email:</p>
                          <p className="text-muted">{user.email}</p>
                        </div>
                        <div className="col-md-4">
                          <p className="mb-0">Office Address:</p>
                          <p className="text-muted">{user.office}</p>
                        </div>
                      </div>
                      <p className="mb-3">Research Work:</p>
                      <p className="text-muted">{user.researchWork}</p>
                    </div>
                  </div>
                  <div className="col-md-4 gradient-custom text-center text-white" >
                    <img src="" alt="image" className="my-5" style={{ width: '200px', height: '200px' }}  />
                    <i className="fas fa-edit mb-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfProfile;
