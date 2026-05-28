import React,{useState,useEffect} from 'react'
import NotesItem from '../Components/notes/NotesItem'
import { Textarea } from '../Components/index'
import { useDispatch,useSelector } from 'react-redux'
import { updateNote,setNotes } from '../store/slices/noteSlice'
import { setTheme } from '../store/slices/uiSlice'
import {lightColors,darkColors} from '../Constants/NoteColor'
import dbservice from '../appwrite/database'
import { useParams } from 'react-router-dom'


function EditNote() {
  const { id } = useParams()
  const [note,setNote] = useState(null)

  useEffect(() => {
    if(id){
      dbservice.getNote(id)
        .then((data)=> setNote(data))
    }
  }, [id]);
  const [notetitle, setNotetitle] = useState("")
  const [notecontent, setNotecontent] = useState("")
  const userId= useSelector((state)=> state.auth.userData?.$id)
  useEffect(() => {
  if(note){
    setNotetitle(note.title || "")
    setNotecontent(note.content || "")
  }
}, [note])

  const theme= useSelector((state)=> state.ui.theme)
  
  const dispatch= useDispatch()
  const handleUpdate = async (apiCall) => {await
  apiCall.then((updatedNote) => {
    dispatch(updateNote(updatedNote));
  });
}
   const setPin=async($id)=>{
    const pin= !note.isPinned
    await handleUpdate(dbservice.pinNote($id,pin));
  }
   
   const setArchive= async($id)=>{
   await handleUpdate(dbservice.archiveNote($id))

  }
   const setTrash=async ($id)=>{
   await handleUpdate(dbservice.trashNote($id))
  
  }

  const edit = () => {
  const updatedData = {
    title: notetitle,
    content: notecontent
  };

  handleUpdate(dbservice.updateNote(note.$id, updatedData));
};
if(!note){
  return <p>Loading...</p>
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
    active:scale-95 ${note.isPinned? "opacity-100": "opacity-50"}`} onClick={()=>setPin(note.$id)}
              
              >📌</button>
    
            </div>
    
            <input className={` font-semibold text-center text-lg bg-transparent outline-none w-full text-slate-700`}
              value={notetitle}
              onChange={(e) => setNotetitle(e.target.value)}
            />

            <Textarea
              className={`my-8 resize-none text-slate-700 focus:ring-2 focus:ring-blue-300 rounded-xl border-white p-1 bg-transparent outline-none`}
              value={notecontent}
              onChange={(e) => setNotecontent(e.target.value)}
            />
          
            <div className='flex justify-between items-center '>
              <p className={`text-sm opacity-70 text-slate-700`}>{note.createdOn}</p>
              <div className='flex gap-2'>
                <button className='cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95'
                  onClick={() => edit()
                  }>💾</button>
                <button className='cursor-pointer transition-all duration-200
    hover:scale-110
    active:scale-95' onClick={()=>setTrash(note.$id)}>🗑️</button>
    <button onClick={()=>setArchive(note.$id)}>archive</button>
              </div>
    
            </div>
    
    
          </div>
        </>
  )
}

export default EditNote
