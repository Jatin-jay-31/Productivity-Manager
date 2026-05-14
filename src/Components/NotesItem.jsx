import React, { useState } from 'react'
import useNotes from '../Context/NotesContext'

function NotesItem({ note }) {
  const [iseditable, setIseditable] = useState(false)
  const [notetitle, setNotetitle] = useState(note.title)
  const [notecontent, setNotecontent] = useState(note.content)
  const { updateNote, deleteNote, togglePin } = useNotes()
  const edit = () => {
    updateNote(note.id, { ...note, title: notetitle, content: notecontent })
    setIseditable(false)
  }
  const deleteNoteitem = () => {
    deleteNote(note.id)
  }
  const toggleNoteitem = () => {
    togglePin(note.id)
    note.pinned ? "opacity-100" : "opacity-40"
  }
  return (
    <>
      <div className='h-60 w-50 bg-amber-300 rounded-2xl m-4 p-4 hover:-translate-y-1
transition-transform
duration-200
shadow-md
hover:shadow-xl'>
        <div className=' text-right'>
          <button className='cursor-pointer' onClick={toggleNoteitem}
          
          >📌</button>

        </div>

        <input className='text-center outline-none'
          value={notetitle}
          onChange={(e) => setNotetitle(e.target.value)}
          readOnly={!iseditable}
        />
        {iseditable?
        (<textarea
          className='my-8 resize-none hover:border-2 rounded-xl border-white p-1'
          value={notecontent}
          onChange={(e) => setNotecontent(e.target.value)}
          readOnly={!iseditable}
        ></textarea>)
        :
        (<p className='line-clamp-3 my-8'>{notecontent}</p>)
       }
        <div className='flex gap-12'>
          <p>{note.createdOn}</p>
          <div>
            <button className='cursor-pointer'
              onClick={() => {
                if (iseditable) {
                  edit()
                } else {
                  setIseditable((prev) => !prev)
                }
              }}>✏️</button>
            <button className='cursor-pointer' onClick={deleteNoteitem}>🗑️</button>
          </div>

        </div>


      </div>
    </>
  )
}

export default NotesItem
