import{ React, useState, useEffect }from 'react'
import axios from 'axios';
import Prof from '../Prof'
import '../prof.css'

function Cse(props) {
  return (
    <div className='faculty-main-api'>
      <h2>This is Computer science faculty page</h2>
      <Prof 
       onClick={props.onClick}
       departmentName = "Computer Science And Engineering" />
    </div>
  )

}

export default Cse
