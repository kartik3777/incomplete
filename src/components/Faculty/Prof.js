import{ React, useState, useEffect }from 'react'
import axios from 'axios';
import './prof.css'
import Loader from './Loader'
import { useNavigate } from 'react-router-dom'; 

function ProfCard(props){
  const navigate = useNavigate();

  function showProjectsOfOneProject(){

    const uniqueId = props.email.split("@")[0];
    props.getFacultyIdForProject(uniqueId);
    navigate("/OneProfProjects");
  }
  //https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png

  //https://us.123rf.com/450wm/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration.jpg?ver=6
     
    return(
        <div onClick={showProjectsOfOneProject} className='prof-card'>
            <div className='box-1'>
                <div className="prof-dp">
                    <div className='circle-prof'>
                   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png" alt="image" />
                    </div>
                </div>
                <div className="prof-details">
                    <h3>{props.name}</h3>
                    <p>{props.desig}</p>
                   <p>{props.phone}</p>
                   <p>{props.address}</p>
                   <p>{props.email}</p>
                  
                </div>
            </div>
            <div className='box-2'>
                <p><span>Research Areas:- </span>{props.research}</p>
            </div>
        </div>
    );
}


function Prof(props) {
    const [facultyData, setFacultyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [kartik, setKartik] = useState("Computer Science And Engineering")
       const url = `https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app/api/user/faculty/?department=${props.departmentName}`;
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            url
          );
        //  console.log(response.data);
          setFacultyData(response.data);
          setLoading(false);       
        } catch (error) {
          console.error("Error fetching faculty data:", error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);

  return (
    <div id='faculty-page'  className='faculty-page'>
        {loading ? ( 
        <Loader />
      ) : (
        facultyData.map((item) => {
          return (
            <ProfCard
              department={item.department}
              key={item.name}
              name={item.name}
              desig={item.designation}
              phone={item.contact}
              address={item.address}
              email={item.email}
              research={item.research}
              getFacultyIdForProject={props.getFacultyIdForProject}
            />
          )
        })
      )}
    </div>
  )
}

export default Prof;
