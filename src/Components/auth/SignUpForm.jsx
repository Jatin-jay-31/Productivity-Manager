import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import authService from '../../appwrite/auth'
import { login as authLogin } from '../../store/slices/authSlice'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import { Button, Logo, Input } from '../index'
import toast from "react-hot-toast"

function SignUpForm() {
    const navigate = useNavigate()
    const location=useLocation()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm()
    const theme=useSelector((state)=> state.ui.theme)

const signup = async (data) => {

    setError("")

    try {

        const session =
            await authService.createAccount(data)

        if (session) {

            const userData =
                await authService.getCurrentUser()

            if (userData) {

                const safeUser = {
                    $id: userData.$id,
                    name: userData.name,
                    email: userData.email
                }

                dispatch(
                    authLogin({
                        userData: safeUser
                    })
                )

                toast.success(
                    "Account Created Successfully",
                    { duration: 2000 }
                )

                if (location.state?.fromCreateNote) {

                    navigate("/", {
                        state: {
                            openCreate: true
                        }
                    })

                } else {
                    navigate("/")
                }
            }
        }

    } catch (error) {

        setError(error.message)
        toast.error(error.message)

    }
}

    return (
        <div className="flex items-center justify-center gap-6 max-h-screen">
            <div className={`mx-auto w-full max-w-md bg-gray-100 rounded-2xl p-10  shadow-xl  ${theme==='light'? "bg-white border border-slate-200": "bg-slate-800 border border-slate-700"}`}>
                <div className="mb-2 flex justify-center">
                    <span className="flex justify-center w-full">
                        <Logo />
                    </span>
                </div>
                <h2 className={` text-center text-2xl font-bold leading-tight ${theme==='light'? "text-black ": "text-white "}`}>Sign up to create account</h2>
                <p className={`text-center text-base  my-4 ${theme==='light'? "text-black/60 ": "text-white "} `}>
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className={` ${theme==='light'? "text-black/60 ": "text-white "} font-medium text-primary transition-all duration-200 hover:underline`}
                    >
                        Sign In
                    </Link>
                </p>
                {error && (<p className="text-red-600 mt-8 text-center">
                    {error} </p>)}

                <form onSubmit={handleSubmit(signup)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
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
                        <Button type='submit' className='w-full' >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default SignUpForm 