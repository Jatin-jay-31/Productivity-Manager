import React, { useState } from 'react'
import { addNote,updateNote,removeNote,setNotes,clearNotes,setLoading,setError } from '../../store/slices/noteSlice'
import { setTheme } from '../../store/slices/UiSlice'
import {lightColors,darkColors} from '../../Constants/NoteColor'
import dbservice from '../../appwrite/database'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate,useLocation } from 'react-router-dom'
import {Textarea} from '../index'


function NotesItem({ note,selectedNotes=[],setSelectedNotes }) {

  const [notetitle, setNotetitle] = useState(note.title)
  const [notecontent, setNotecontent] = useState(note.content)
  if (!note) return null
  const theme= useSelector((state)=> state.ui.theme)
  const navigate=useNavigate()
  const location = useLocation()
  const toggleSelect = () => {
  if(selectedNotes.includes(note.$id)){
    setSelectedNotes(
      selectedNotes.filter((id) => id!==note.$id)
    )
  } else {
    setSelectedNotes([
      ...selectedNotes,
      note.$id
    ])
  }
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
  : "border border-white/30 hover:border-2 border-white/100"} }`}  onClick={()=> navigate(`/note/${note.$id}`)}>
        <div className=' text-right'>
        </div>
        {location.pathname === "/note/trash" && (
          <input
type="checkbox"
checked={selectedNotes.includes(note.$id)}
onClick={(e)=>e.stopPropagation()}
onChange={toggleSelect}
/>
        )}

        <input className={` font-semibold text-center text-lg bg-transparent outline-none w-full text-slate-700`}
          value={notetitle}
          onChange={(e) => setNotetitle(e.target.value)}
          readOnly
        />
        <Textarea
          className={`my-8 resize-none text-slate-700 focus:ring-2 focus:ring-blue-300 rounded-xl border-white p-1 bg-transparent outline-none`}
          value={notecontent}
          readOnly
          onChange={(e) => setNotecontent(e.target.value)}
        />
        <div className='flex justify-between items-center '>
          <p className={`text-sm opacity-70 text-slate-700`}>{note.createdOn}</p>
          <div className='flex gap-2'>
          </div>

        </div>
      </div>
    </>
  )
}

export default NotesItem
