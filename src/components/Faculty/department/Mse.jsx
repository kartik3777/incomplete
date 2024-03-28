import React from 'react'
import Prof from '../Prof'
import '../prof.css'

function Mse(props) {
  return (
    <div className='faculty-main-api'>
      <h2>Material Science and Engineering faculty page</h2>
      <Prof getFacultyIdForProject={props.getFacultyIdForProject} departmentName = "Material Science and Engineering" />
    </div>
  )
}

export default Mse
