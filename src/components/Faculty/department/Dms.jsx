import React from 'react'
import Prof from '../Prof'
import '../prof.css'

function Dms(props) {
  return (
    <div className='faculty-main-api'>
    <h2>Department of Management Sciences faculty page</h2>
    <Prof getFacultyIdForProject={props.getFacultyIdForProject} departmentName = "Department of Management Sciences" />
  </div>
  )
}

export default Dms
