import React,{useEffect} from 'react'
import {SearchBar,NotesList,NotesItem,EmptyState} from '../Components/index'
import dbservice from '../appwrite/database'
import { useDispatch, useSelector } from 'react-redux'
import { setNotes } from '../store/slices/noteSlice'


function Pinned() {
  const dispatch=useDispatch()
    const userId= useSelector((state)=> state.auth.userData?.$id)
    const theme= useSelector((state)=> state.ui.theme)
    useEffect(() => {
        if(userId) dbservice.getPinnedNotes(userId).then((data)=> dispatch(setNotes(data.rows)))
        },[userId,dispatch])  
    
  return (
    <>
    <div className={`min-h-screen py-8 w-11/12 mx-auto  ${theme==='light'? "bg-blue-50": "bg-slate-900"}`}>
    <div className={` w-full flex-1 flex items-center justify-center my-2 ${theme==='light'? "bg-blue-50": "bg-slate-900"}`}>
              <SearchBar />
            </div>
    <div className='flex items-center flex-col'>
            <NotesList/>
        </div>
    </div>
    </>
  )
}

export default Pinned
