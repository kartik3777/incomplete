import React from 'react'
import Prof from '../Prof'
import '../prof.css'

function Ee(props) {
  return (
    <div>
      <h2>This is Electrical faculty page </h2>
      <Prof getFacultyIdForProject={props.getFacultyIdForProject} departmentName = "Electrical Engineering" />
    </div>
  )
}

export default Ee
