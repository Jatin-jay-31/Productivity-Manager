import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logo() {
  const navigate=useNavigate()
  const navItem={
            name: 'Home',
            path: '/',
            active: true
        }
  return (
    <div className='w-10 mx-2'>
      <span> <img src="src/assets/3d-notes.png" alt="img" onClick={()=> navigate(navItem.path)} /> </span>
    </div>
  )
}

export default Logo
