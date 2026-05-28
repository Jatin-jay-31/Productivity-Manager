import React, { use } from 'react'
import authService from '../../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { clearNotes } from '../../../store/slices/noteSlice'

function LogoutBtn() {
    const dispatch= useDispatch()
    const navigate=useNavigate()
    const logoutHandler= async()=>{ 
      try {
        await authService.logout()
        dispatch(logout())
        dispatch(clearNotes())
        navigate("/")
      } catch (error) {
        console.log(error)
      }
        
    }
  return (
    <div>
      <button onClick={logoutHandler}
      className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
      >Logout</button>
    </div>
  )
}

export default LogoutBtn
