import React from 'react'
import Prof from '../Prof'
import '../prof.css'

function Che(props) {
  return (
    <div className='faculty-main-api'>
      <h2>Chemical Engineering faculty page</h2>
      <Prof getFacultyIdForProject={props.getFacultyIdForProject} departmentName = "Chemical Engineerinng" />
    </div>
  )
}

export default Che
