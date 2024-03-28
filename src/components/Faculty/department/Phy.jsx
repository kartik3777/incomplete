import React from 'react'
import Prof from '../Prof'
import '../prof.css'

function Phy(props) {
  return (
    <div className='faculty-main-api'>
    <h2>Physics Department faculty page</h2>
    <Prof getFacultyIdForProject={props.getFacultyIdForProject} departmentName = "Physics Department" />
  </div>
  )
}

export default Phy
