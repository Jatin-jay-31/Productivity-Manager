import React, { use } from 'react'
import authService from '../../../appwrite/auth'
import { useDispatch,useSelector } from 'react-redux'
import { logout } from '../../../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { clearNotes,setNotes, setLoading, setError } from '../../../store/slices/noteSlice'
import toast from 'react-hot-toast'

function LogoutBtn({className=""}) {
    const dispatch= useDispatch()
    const navigate=useNavigate()
    const loading = useSelector((state) => state.note.loading)
    const error = useSelector((state) => state.note.error)
    const theme= useSelector((state)=> state.ui.theme)
    const logoutHandler= async()=>{ 
      try {
        await authService.logout()
        dispatch(logout())
        dispatch(clearNotes())
        dispatch(setError(null))
        toast.success("Logged out Successfully",{duration:2000})
      } catch (error) {
        setError(error.message)
        toast.error(error.message)
      }
        
    }
  return (
    <button
            onClick={logoutHandler}
            className={`${className} inline-block duration-200 ${theme==='light'? " hover:bg-blue-100": "hover:bg-slate-700"}`}
        >
            Logout
        </button>
  )
}

export default LogoutBtn
