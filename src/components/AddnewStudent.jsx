import React from 'react'
import { Link } from 'react-router-dom'

function AddnewStudent() {
  return (
    <div className='border bg-gray-200 font-semibold border-gray-300 p-2 text-[#3F526E] rounded'>
      <Link to="/add-student">
        <button>+ Add new Student</button>
      </Link>
    </div>
  )
}

export default AddnewStudent