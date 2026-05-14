import React, { useState } from 'react'
import useNotes from '../Context/NotesContext'

function NotesForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const { addNote } = useNotes()
  const add = (e) => {
    e.preventDefault()
    if (!title || !content) return
    addNote({ createdOn: new Date().toLocaleDateString(), title, content, pinned: false })
    setTitle("")
    setContent("")
  }
  return (
    <>
      <form onSubmit={add} className="flex items-center  flex-col  bg-gray-200 
     w-50 rounded-2xl h-60 m-4 p-4 gap-5 shadow-md hover:-translate-y-1 shadow-xl transition-all duration-200">
        <input className='p-2 px-3 outline-none w-full focus:ring-2
focus:ring-blue-300 rounded-2xl'  type="text" placeholder='Add note title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea className='p-2 px-3 outline-none resize-none w-full focus:ring-2
focus:ring-blue-300 rounded-2xl' placeholder="Write your note..." value={content}
          onChange={(e) => setContent(e.target.value)} />
        <button type="submit" className='w-20  bg-black text-white p-2 rounded-2xl cursor-pointer hover:bg-gray-800
active:scale-95
transition-all'
        >Add</button>
      </form>
    </>
  )
}

export default NotesForm
