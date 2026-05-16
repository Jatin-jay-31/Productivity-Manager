import React, { useState } from 'react'
import useNotes from '../Context/NotesContext'
import {lightColors,darkColors} from '../Constants/NoteColor'

function NotesForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const { addNote,theme } = useNotes()
  
  const add = (e) => {
    e.preventDefault()
    if (!title || !content) return
    addNote({ createdOn: new Date().toLocaleDateString(), title, content, pinned: false,createdAt: Date.now(), colorIndex: Math.floor(Math.random() * lightColors.length) })
    setTitle("")
    setContent("")
  }
  return (
    <>
      <form onSubmit={add} className={`flex items-center  flex-col border border-slate-700 ${theme==='light'? "bg-white": "bg-slate-800"} 
     w-60 rounded-2xl  m-4 p-4 gap-5 shadow-md hover:-translate-y-1 shadow-xl transition-all duration-200`}>
        <input className={`p-2 px-3 outline-none w-full focus:ring-2
focus:ring-blue-300 rounded-2xl bg-transparent ${theme==='light'? "placeholder:text-slate-700 ": "placeholder:text-white"}`}  type="text" placeholder='Add note title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea className={`p-2 px-3 outline-none resize-none w-full focus:ring-2
focus:ring-blue-300 min-height-[100px] rounded-2xl bg-transparent ${theme==='light'? " placeholder:text-slate-700 ": "placeholder:text-white"}`} placeholder="Write your note..." value={content}
          onChange={(e) => setContent(e.target.value)} />
        <button type="submit" className={`w-20 ${theme==='light'? "bg-slate-700 hover:bg-slate-900 ": " bg-blue-500 hover:bg-blue-700"}  text-white p-2 rounded-2xl cursor-pointer 
active:scale-95
transition-all`}
        >Add</button>
      </form>
    </>
  )
}

export default NotesForm
