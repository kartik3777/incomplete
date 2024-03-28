import{ React, useState, useEffect }from 'react'
import axios from 'axios';
import Prof from '../Prof'
function Ce() {

  return (
    <div className='faculty-main-api'>
      <h2>This is civil faculty page </h2>
      <Prof departmentName = "Civil Engineering" />
    </div>
  )
}

export default Ce
