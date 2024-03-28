import React from 'react'
import Prof from '../Prof'
import '../prof.css'

function Me(props) {
  return (
    <div className='faculty-main-api'>
      <h2>Mechanical Engineering faculty page</h2>
      <Prof getFacultyIdForProject={props.getFacultyIdForProject} departmentName = "Mechanical Engineering" />
    </div>
  )
}

export default Me
