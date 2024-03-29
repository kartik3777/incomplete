import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from "react-router-dom";
import './about.css';

function NewProject(props) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cpirequired: '',
    prereg: '',
    openfor: '',
    projectCategory: '',
    resumerequired: 'yes', 
    maxstudents: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };



  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const uniqueID = props.profId;
      console.log("uniqueId reached to newPorject is: "+ uniqueID);
      const url = `https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/professor/${uniqueID}/createproject`;

     
      const response = await axios.post(url, formData);
  
      if (response.status === 201) {
        console.log('Project created successfully');
        navigate('/Project_list_prof');
      } else {
        console.error('Failed to create project');
        alert("error occured");
      }
    } catch (error) {
      console.error('Error creating project:', error.message);
    }
  };


  return (
    <div>
      <div className="project-details-container">

        <form onSubmit={handleSubmit}  >

          <label className='project-form-label' htmlFor="project-name">Project Name:</label>
          <input
            type="text"
            id="project-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label id='kartik' className='project-form-label' htmlFor="Description">Description:</label>
          <input
            type="text"
            id="Description"
            name="description"
            onChange={handleChange}
          />
          <label id='kartik' className='project-form-label' htmlFor="minimum-cpi">Minimum Cpi:</label>
          <input
            type="text"
            id="minimum-cpi"
            name="cpirequired"
            onChange={handleChange}
          />
          <label id='kartik' className='project-form-label' htmlFor="prerequisites">Prerequisites:</label>
          <input
            type="text"
            id="prerequisites"
            name="prereg"
            onChange={handleChange}
          />
          <label id='kartik' className='project-form-label' htmlFor="open-for">Open For:</label>
          <input
            type="text"
            id="open-for"
            name="openfor"
            placeholder="Batches"
            onChange={handleChange}
          />
          <label id='kartik' className='project-form-label' htmlFor="category">Category: </label>
          <input
            type="text"
            id="category"
            name="projectCategory"
            placeholder="e.g. Machine Learning"
            onChange={handleChange}
          />
          <label id='kartik' className='project-form-label' htmlFor="resume">Resume:</label>
          <select
            id="resume"
            name="resumerequired"
            onChange={handleChange}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <label id='kartik' className='project-form-label' htmlFor="max-students">Total Students</label>
          <input
            type="text"
            id="max-students"
            name="maxstudents"
            onChange={handleChange}
          />

          <div className="project-buttons">
          <Link id='cancel-kar'  to="/Project_list_prof">
            <button className="button" id="cancel-button">
            Cancel
          </button>
          </Link>
          
           <input type="submit" className="submit-button" value="Save" />
           </div>
          
        </form>
      </div>
    </div>
  );
}

export default NewProject;
