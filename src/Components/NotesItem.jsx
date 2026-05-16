import React, { useState } from 'react'
import useNotes from '../Context/NotesContext'
import {lightColors,darkColors} from '../Constants/NoteColor'

function NotesItem({ note }) {
  const [iseditable, setIseditable] = useState(false)
  const [notetitle, setNotetitle] = useState(note.title)
  const [notecontent, setNotecontent] = useState(note.content)
  const { updateNote, deleteNote, togglePin,theme,pinned } = useNotes()
  const edit = () => {
    updateNote(note.id, { ...note, title: notetitle, content: notecontent })
    setIseditable(false)
  }
  const deleteNoteitem = () => {
    deleteNote(note.id)
  }
  const toggleNoteitem = () => {
    togglePin(note.id)
  }
  return (
    <>
      <div className={` w-60 rounded-2xl m-4 p-4 hover:-translate-y-1
transition-transform
duration-200
shadow-md
hover:shadow-xl border
 ${theme === "light"
  ? lightColors[note.colorIndex]
  : darkColors[note.colorIndex]} ${theme === "light"
  ? "border border-slate-300 hover:border-slate-400"
  : "border border-white/30 hover:border-2 border-white/100"}`}>
        <div className=' text-right'>
          <button className={`cursor-pointer transition-all duration-200
hover:scale-110
active:scale-95 ${note.pinned? "opacity-100": "opacity-50"}`} onClick={toggleNoteitem}
          
          >📌</button>

        </div>

        <input className={` font-semibold text-center text-lg bg-transparent outline-none w-full text-slate-700`}
          value={notetitle}
          onChange={(e) => setNotetitle(e.target.value)}
          readOnly={!iseditable}
        />
        {iseditable?
        (<textarea
          className={`my-8 resize-none text-slate-700 focus:ring-2 focus:ring-blue-300 rounded-xl border-white p-1 bg-transparent outline-none`}
          value={notecontent}
          onChange={(e) => setNotecontent(e.target.value)}
          readOnly={!iseditable}
        ></textarea>)
        :
        (<p className={` line-clamp-3 my-8 text-slate-700`}>{notecontent}</p>)
       }
        <div className='flex justify-between items-center '>
          <p className={`text-sm opacity-70 text-slate-700`}>{note.createdOn}</p>
          <div className='flex gap-2'>
            <button className='cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95'
              onClick={() => {
                if (iseditable) {
                  edit()
                } else {
                  setIseditable((prev) => !prev)
                }
              }}>✏️</button>
            <button className='cursor-pointer transition-all duration-200
hover:scale-110
active:scale-95' onClick={deleteNoteitem}>🗑️</button>
          </div>

        </div>


      </div>
    </>
  )
}

export default NotesItem
