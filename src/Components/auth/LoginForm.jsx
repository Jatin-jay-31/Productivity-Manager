import React,{useState}  from 'react'
import {useForm} from "react-hook-form"
import { useDispatch,useSelector } from 'react-redux'
import authService from '../../appwrite/auth'
import { login as authLogin } from '../../store/slices/authSlice'
import { Link,useNavigate } from 'react-router-dom'
import {Button,Logo,Input} from '../index'
import toast from 'react-hot-toast'

function Loginform() {
    const theme= useSelector((state)=> state.ui.theme)
    const navigate= useNavigate()
    const dispatch=useDispatch()
    const{register,handleSubmit}= useForm()
    const [error,setError]= useState("")

    const login = async (data) => {

  setError("")

  try {

    const session =
      await authService.login(data)

    if (!session) {
      toast.error("Login failed")
      return
    }

    const userData =
      await authService.getCurrentUser()

    if(userData){

    const safeUser = {
            $id: userData.$id,
            name: userData.name,
            email: userData.email
        }
            dispatch(authLogin({
            userData: safeUser}))

    toast.success(
        "Welcome back",
        { duration: 2000 }
    )

    setTimeout(() => {
        navigate("/")
    }, 800)
}} catch (error) {

    setError(error.message)

    toast.error(error.message)
  }
}
  return (
    <div
    className='flex items-center justify-center w-full gap-6 max-h-screen'
    >
        <div className={`mx-auto w-full max-w-md bg-gray-100 rounded-2xl p-10   shadow-xl
  ${theme==='light'? "bg-white border border-slate-200": "bg-slate-800 border border-slate-700"} `}>
        <div className="mb-2 flex justify-center">
                    <span className="flex justify-center w-full">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className={`text-center text-2xl font-bold leading-tight ${theme==='light'? "text-black": "text-white "}`}>Sign in to your account</h2>
        <p className={`mt-2 text-center text-base  ${theme==='light'? "text-black/60 ": "text-white "}`}>
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className={`font-medium text-primary transition-all duration-200 hover:underline ${theme==='light'? "text-black/60 ": "text-white "}`}
                    >
                        Sign Up
                    </Link>
        </p>
        {error && (<p className="text-red-600 mt-8 text-center">{error}</p>)}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Loginform
