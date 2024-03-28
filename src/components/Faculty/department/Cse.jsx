import{ React, useState, useEffect }from 'react'
import axios from 'axios';
import Prof from '../Prof'
import '../prof.css'

function Cse() {
  return (
    <div className='faculty-main-api'>
      <h2>This is Computer science faculty page</h2>
      <Prof departmentName = "Computer Science And Engineering" />
    </div>
  )

}

export default Cse
