import React from 'react'
import Prof from '../Prof'
import '../prof.css'

function Ae(props) {
  return (
    <div className='faculty-main-api'>
      <h2>Aerospace Engineering faculty page</h2>
      <Prof getFacultyIdForProject={props.getFacultyIdForProject} departmentName = "Aerospace Engineering" />
    </div>
  )
}

export default Ae
