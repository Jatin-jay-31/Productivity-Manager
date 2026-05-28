import React,{useState} from "react";
import { SearchBar,NotesForm,NotesList,Modal } from "../Components/index";
import {useSelector,useDispatch} from 'react-redux'
import dbservice from "../appwrite/database";
import { setNotes } from "../store/slices/noteSlice";
import { useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";

function Home() {
  const userId= useSelector((state)=> state.auth.userData?.$id)
  const theme= useSelector((state)=> state.ui.theme)
  const notes = useSelector((state) => state.note.notes)
  const authStatus=useSelector((state)=> state.auth.status)
  const navigate= useNavigate()
  const location=useLocation()
  const [showmodal,setShowModal]= useState(false)
  const dispatch= useDispatch()

  const handleCreateNote = () => {
  if(authStatus){
    setShowModal(true)
  } else {
    navigate("/signup", {
      state: {
        fromCreateNote: true
      }
    })
  }
}
useEffect(() => {
  if(location.state?.openCreate){
    setShowModal(true)
  }
}, [location.state])

  useEffect(() => {
    if(userId){
      const data= dbservice.getNotes(userId).then((data)=> dispatch(setNotes(data.rows)))

    }
  }, [userId])
  
  return (
    <div className={`min-h-screen py-8 w-11/12 mx-auto  ${theme==='light'? "bg-blue-50": "bg-slate-900"}`}>
      <div className="px-6">
        <div className={` w-full px-4 my-2 ${theme==='light'? "bg-blue-50": "bg-slate-900"}`}>
          <SearchBar />
        </div>
        <div className='flex flex-wrap gap-6'>
        <NotesList setShowModal={setShowModal} handleCreateNote={handleCreateNote} />
      </div>
      {
notes.length===0
? (
    showmodal && (
      <Modal onClose={()=>setShowModal(false)}>
        <NotesForm setShowModal={setShowModal}/>
      </Modal>
    )
  )
: (
    <NotesForm/>
  )
}
      
      
      </div>
      
    </div>
  );
}

export default Home;
