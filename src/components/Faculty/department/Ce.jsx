import{ React, useState, useEffect }from 'react'
import axios from 'axios';
import Prof from '../Prof'
import '../prof.css'

function Ce(props) {

  return (
    <div className='faculty-main-api'>
      <h2>This is civil faculty page </h2>
      <Prof
      onClick={props.onClick} departmentName = "Civil Engineering" />
    </div>
  )
}

export default Ce
