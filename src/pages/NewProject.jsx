import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link,useNavigate } from "react-router-dom";
import './about.css';
import Loader from '../components/Faculty/Loader';

function NewProject(props) {
  const navigate = useNavigate();

  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const[custom, setCustom]= useState(false);
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
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/faculty/projects/`
        );
        // console.log(response.data);
        setFacultyData(response.data); 
        setLoading(false); 
        // Assuming the response contains an array of faculty data
      } catch (error) {
        console.error("Error fetching faculty data:", error);
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

       // Create a Set to store unique projectCategory values
  const uniqueCategoriesSet = new Set();

// Iterate through the facultyData array
 facultyData.forEach((item) => {
   if(item.projectCategory){
    uniqueCategoriesSet.add(item.projectCategory);
   }
 
 });

// Convert the Set back to an array
const uniqueCategoriesArray = Array.from(uniqueCategoriesSet);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name==="projectCategory" && value==="other"){
      setCustom(true); 
      return;
    }
    else if(name==="projectCategory"){
      let flag= false;
      for(let i=0; i<uniqueCategoriesArray.length;i++){
      if(uniqueCategoriesArray[i].projectCategory===value){
       flag=true; }}
      if(flag){
      setCustom(false); return;}
    }
    if(name==="maxstudents"){
      e.target.value = `${value}`;
    }
    if(name==="cpirequired"){
      e.target.value = `${value}`;
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if(
      !formData.name ||
      !formData.description ||
      !formData.cpirequired ||
      !formData.prereg ||
      !formData.openfor ||
      !formData.projectCategory ||
      !formData.resumerequired ||
      !formData.maxstudents 
    ){
      alert("Please fill all details."); 
      return;
    }
    
    const floatValue = parseFloat(formData.cpirequired);
    
    if (isNaN(floatValue) || floatValue < 0 || floatValue > 10) {
        alert('Please enter a valid CPI between 0 and 10.');
        return; 
    }
    const num = parseInt(formData.maxstudents);
    if(!(Number.isInteger(num) && num > 0)){
      alert('Total students must be a valid positive integer.');
      return;
    }

   // e.preventDefault();
    try {
      setSaving(true);
      const uniqueID = props.profId;
      //console.log("uniqueId reached to newPorject is: "+ uniqueID);
      const url = `https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/professor/${uniqueID}/createproject`;

     
      const response = await axios.post(url, formData);
  
      if (response.status === 201) {
       // console.log('Project created successfully');
        navigate('/Project_list_prof');
      } else {
       // console.error('Failed to create project');
        alert("error occured");
      }
    } catch (error) {
      console.error('Error creating project:', error.message);
    }finally {
      setSaving(false); setCustom(false);
    }
  };
  if (loading) {
    return <Loader  />;
  }


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
            type="number"
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
          <select id="category" name="projectCategory" onChange={handleChange}>
              <option  value="">Select Category</option>
               {uniqueCategoriesArray.map((category, index) => {
                  if (category.length <70) {
                   return <option key={index} value={category}>{category}</option>;
                  }
                  return null;
               })}
               <option value="other">Other(Custom)</option>
          </select>

          {custom && (
            <input
            type="text"
            id="other-category"
            name="projectCategory"
            placeholder="Enter custom category"
            onChange={handleChange}
            />
          )}
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
            type="number"
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
          
          <input
              type="submit"
              className="submit-button"
              placeholder='bhai'
              value={saving ? (
                "Saving..."
              ) : "Save"}
              disabled={saving}
            />
           </div>
          
        </form>
      </div>
    </div>
  );
}

export default NewProject;
