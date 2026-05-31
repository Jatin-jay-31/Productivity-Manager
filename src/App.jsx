import { useState, useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { login,logout } from './store/slices/authSlice'
import authService from './appwrite/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Header, NotesForm, NotesList, SearchBar, ThemeToggle } from './Components'
import Container from './Components/layout/Container'
import { Toaster } from "react-hot-toast"

function App() {
  const [loading,setLoading]=useState(true)
  const authStatus= useSelector((state)=> state.auth.status)
  const dispatch= useDispatch()

useEffect(() => {

  let isMounted = true

  const init = async () => {

    try {

      const userData =
        await authService.getCurrentUser()

      if (!isMounted) return

      if (userData) {

        const safeData = {
          $id: userData.$id,
          name: userData.name,
          email: userData.email
        }

        dispatch(
          login({
            userData: safeData
          })
        )

      } else {
        dispatch(logout())
      }

    } catch (err) {

      dispatch(logout())

    } finally {

      if (isMounted) {
        setLoading(false)
      }

    }
  }

  init()

  return () => {
    isMounted = false
  }

}, [])

  return !loading ? (
    <>
    <Toaster position="top-center" />
      <Container>
      <div className="flex items-center flex-col " >
        <Header />
        <Outlet/>
        </div>
      </Container>
    </>
  ) : null
}

export default App
