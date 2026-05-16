import React from 'react'
import useNotes from '../Context/NotesContext'

function ThemeToggle() {
    const{theme,toggleTheme}=useNotes()
  return (
    <>
    <label htmlFor="input" className='cursor-pointer'>
        <input type='checkbox' value={theme} checked={theme==='dark'} onChange={toggleTheme} className='sr-only' id='input'/>
    <div className={`w-14 h-8 rounded-full ${theme==='light' ? "bg-slate-300" : "bg-blue-500"} flex  items-center justify-start transition-all duration-300`}>
        <div className={`w-6 h-6 rounded-full ${theme==='light' ? "bg-white" : "bg-slate-100"} m-1 transition-all duration-300 shadow-md ${theme==='light'? " translate-x-0":" translate-x-6" }`}></div>
    </div>
    </label>
    
    </>
  )
}

export default ThemeToggle
