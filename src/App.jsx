import React, { useState,createContext } from "react";
import { BrowserRouter, Routes, Route , useParams } from "react-router-dom";
import ContactUs from "./pages/ContactUs";
import NavBar from "./pages/NavBar";
// import DataTable from "./pages/LogOut";
import NewProject from "./pages/NewProject";
import Faculty from "./pages/Faculty"
// import Login from "./pages/Login";
import SignIn from "./components/authentication/SignIn";
import Project_list_prof from "./pages/Project_list_prof";
import Cse from "./components/Faculty/department/Cse";
import Ce from "./components/Faculty/department/Ce";
import Ee from "./components/Faculty/department/Ee";
import Ae from "./components/Faculty/department/Ae";
import Che from "./components/Faculty/department/Che";
import Dms from "./components/Faculty/department/Dms";
import Me from "./components/Faculty/department/Me";
import Mse from "./components/Faculty/department/Mse";
import Phy from "./components/Faculty/department/Phy";

// import Prof from "./components/Faculty/Prof";
import SignUp from "./components/authentication/SignUp";
// import About from "./pages/About";
import LogOut from "./pages/LogOut";
import Student from "./pages/Student";
import ProjectDesc from "./components/Student/ProjectDesc";
import UserProfile from "./pages/UserProfile";
import ProjectCategories from "./components/Student/StudentCard";
import ProjectCategory from "./components/Student/ProjectCategories";
// import ProjectPage from "./components/Student/ProjectPage";
import Home from "./pages/Home";
import History from './pages/History';
import Requests from "./pages/Requests";
import EnrolledStudents from "./pages/EnrolledStudents";
import ProfProfile from "./pages/ProfProfile";
import HomeFaculty from "./pages/HomeFaculty";
import ForgotPassword from "./components/authentication/ForgotPassword";
import OneProfProjects from "./components/Student/OneProfProjects";
import ResetPassword from "./components/authentication/ResetPassword";


function App() {
 const { resetId } = useParams();
  const Api = "https://cs253backederror404teamnotfoundmohammaadnasarsiddiqui.vercel.app"
  // var isWho = "user";
  const [kon, setKon] = useState("user");
  const [isAuthorized, setAuthorization] = useState(false);
  const [CategoryName, setCategoryName] = useState("");
  const[logedInStudentData, setLogedInStudentData] = useState(null);
    // const [loginDetail, setLoginDetail] = useState("");
    const [studentReq, setStudentReq] = useState("");
    const [profId, setProfId] = useState("");
    const [resetToken, setResetToken] = useState("");
    const [facultyIdForProject, setFacultyIdForProject] = useState("");
    const [projectId, setProjectId] = useState("");
    const my =[];
    const acceptedBachhe = [];

    useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isAuthorized && kon === 'user') {
        event.preventDefault();
        event.returnValue = ''; // Required for Chrome
        //navigate('/Home');
      } else if (isAuthorized && kon === 'faculty') {
        event.preventDefault();
        event.returnValue = ''; // Required for Chrome
       // navigate('/Home');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isAuthorized, kon]);

    function getProjectId(x){
      setProjectId(x);
    }
   function getFacultyIdForProject(z){
    setFacultyIdForProject(z);
   }
    function getToken(y){
      setResetToken(y);
      console.log("token is: " + y);
    }
    function handleProfId(x){
     setProfId(x);
    //  console.log(x);
     //console.log("profid in appjsx is: "+profId);
    }

    function handleEn(array){
      //console.log("data recieved of enrolled in app");
      //console.log(array);
      const i = array.length;
      //console.log(i);
      const uniqueSet = new Set([...acceptedBachhe, ...array]);
           const uniqueArray = [...uniqueSet];
           acceptedBachhe.splice(0, acceptedBachhe.length); // Empty the 'my' array
          uniqueArray.forEach(element => {
            acceptedBachhe.push(element); // Push unique elements into the 'my' array
            });
      //console.log("after loop enrolled");
      //console.log(acceptedBachhe);
    }

    function handleReq(array){
      //console.log("data recieved in app.jsx");
        //   console.log(array);
           const i = array.length;
          // console.log(i);
           const uniqueSet = new Set([...my, ...array]);
           const uniqueArray = [...uniqueSet];
           my.splice(0, my.length); // Empty the 'my' array
          uniqueArray.forEach(element => {
             my.push(element); // Push unique elements into the 'my' array
            });
           //console.log("after loop");
           //console.log(my);
    };
  const getData = (isAuth, who, ikartik) => {
    // Handle data from child component
    setAuthorization(isAuth);
    setKon(who);
    setLogedInStudentData(ikartik);
  };

  const handleLogout = () => {
    setAuthorization(false); 
  };

  function getNameOfCategory(x) {
    setCategoryName(x);
  }

  if (isAuthorized) {
    if (kon === "faculty") {

      return (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<NavBar who={kon} />}>
                <Route path="Project_list_prof" element={<Project_list_prof
                getProjectId ={getProjectId}
                profId ={profId}
                 req ={handleReq} 
                 en = {handleEn}
                 />} />
                {/* <Route path="DataTable" element={<DataTable />} /> */}
                <Route path="NewProject" element={<NewProject profId={profId} />} />
                <Route path="Requests" element={<Requests
                projectId ={projectId}
                 my={my}/>} />
                <Route path="ProfProfile" element={<ProfProfile profId={profId} />} />
                <Route index element={<HomeFaculty />} />
                <Route path="Home" element={<HomeFaculty />} />
              

                <Route path="EnrolledStudents" element={<EnrolledStudents
                projectId ={projectId}
                acceptedBachhe ={acceptedBachhe}
                 />} />
                <Route path="ContactUs" element={<ContactUs />} />
                {/* <Route path="LogOut" element={<LogOut />} /> */}
                <Route path="UserProfile" element={<UserProfile
                profId ={profId}
                 logedInStudentData= {logedInStudentData} 
                 />} />
                <Route path="LogOut" element={<LogOut onLogout={handleLogout} />} />
                <Route path={`/resetpassword/${resetToken}`} element={<ResetPassword resetToken={resetToken} />} />
                {/* <Route path="UserProfile" element={<UserProfile loginDetail= {loginDetail} />} /> */}
              </Route>
            </Routes>
          </BrowserRouter>
        </>
      )

    } else if (kon === "user") {

      return (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<NavBar who={kon} />}>
                {/* <Route path="DataTable" element={<DataTable />} /> */}
                <Route path="Faculty" element={<Faculty />}>
                  <Route path="Cse" element={<Cse getFacultyIdForProject={getFacultyIdForProject} />} />
                  <Route path="Ee" element={<Ee getFacultyIdForProject={getFacultyIdForProject} />} />
                  <Route path="Ce" element={<Ce getFacultyIdForProject={getFacultyIdForProject} />} />
                  <Route path="Ae" element={<Ae getFacultyIdForProject={getFacultyIdForProject} />} />
                  <Route path="Che" element={<Che getFacultyIdForProject={getFacultyIdForProject} />} />
                  <Route path="Me" element={<Me getFacultyIdForProject={getFacultyIdForProject} />} />
                  <Route path="Mse" element={<Mse getFacultyIdForProject={getFacultyIdForProject} />} />
                  <Route path="Dms" element={<Dms getFacultyIdForProject={getFacultyIdForProject} />} />
                  <Route path="Phy" element={<Phy getFacultyIdForProject={getFacultyIdForProject} />} />
                </Route>
                <Route path="ContactUs" element={<ContactUs />} />
                <Route path="OneProfProjects" element={<OneProfProjects 
                facultyIdForProject={facultyIdForProject}
                logedInStudentData ={logedInStudentData} />} />
                <Route index element={<Home />} />
                <Route path="Home" element={<Home />} />
                <Route path="LogOut" element={<LogOut onLogout={handleLogout} />} />
                <Route path="Student" element={<ProjectCategories getNameOfCategory={getNameOfCategory} />} />
                <Route path="ProjectPage" element={
                <ProjectCategory
                 CategoryName={CategoryName} 
                 logedInStudentData ={logedInStudentData}
                />} />
                <Route path="ProjectDesc" element={<ProjectDesc />} />
                <Route path="UserProfile" element={<UserProfile logedInStudentData= {logedInStudentData} />} />
                <Route path="History" element={<History />} />
                <Route path={`/resetpassword/${resetToken}`} element={<ResetPassword resetToken={resetToken} />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </>
      )

    }


  }

  else {
   // console.log("reset Token is: "+ resetToken);
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route index element={<SignIn
             sendDataToParent={getData}
             handleProfId ={handleProfId}
             />} />
            <Route path="SignUp" element={<SignUp />} />
            
            <Route  path={`/resetpassword/:resetId`} element={<ResetPassword />} />
            <Route path="SignIn" element={<SignIn
             sendDataToParent={getData}
             handleProfId ={handleProfId}
             />} />
            <Route path="ForgotPassword" element={<ForgotPassword 
            getToken ={getToken}
            />} />

          </Routes>
        </BrowserRouter>
      </>
    )

  }

}

export default App;
