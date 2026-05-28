import { useState, useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { login,logout } from './store/slices/authSlice'
import authService from './appwrite/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Header, NotesForm, NotesList, SearchBar, ThemeToggle } from './Components'
import Container from './Components/layout/Container'

function App() {
  const [loading,setLoading]=useState(true)
  const dispatch= useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
      <Container>
      <div className="flex items-center flex-col " >
        <Header/>
        <Outlet/>
        </div>
      </Container>
  ) : null
}

export default App
