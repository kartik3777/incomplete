import React from 'react'
import Prof from '../Prof'

function Ee(props) {
  return (
    <div>
      <h2>This is Electrical faculty page </h2>
      <Prof 
      onClick={props.onClick} departmentName = "Electrical Engineering" />
    </div>
  )
}

export default Ee
