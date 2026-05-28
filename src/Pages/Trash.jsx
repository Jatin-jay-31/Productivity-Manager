import React,{useEffect,useState} from 'react'
import {NotesList, SearchBar,NotesItem,EmptyState,Button} from '../Components/index'
import dbservice from '../appwrite/database'
import { useDispatch, useSelector } from 'react-redux'
import { setNotes } from '../store/slices/noteSlice'

function Trash() {
  const dispatch=useDispatch()
  const [selectedNotes,setSelectedNotes]=useState([])
  const notes=useSelector((state)=> state.note.notes)
  const theme= useSelector((state)=> state.ui.theme)
    const userId= useSelector((state)=> state.auth.userData?.$id)
    useEffect(() => {
        if(userId) dbservice.getTrashNotes(userId).then((data)=>
            dispatch(setNotes(data.rows)))
      },[userId,dispatch])  
  const handleSelectAll = () => {

  if(
    selectedNotes.length === notes.length
  ){
    setSelectedNotes([])
  } else {
    setSelectedNotes(
      notes.map(note=>note.$id)
    )
  }
  

}
const deleteSelected = async() => {

  await Promise.all(
    selectedNotes.map((id)=>
      dbservice.deleteNote(id)
    )
  )

  const data =
    await dbservice.getTrashNotes(userId)

  dispatch(setNotes(data.rows))

  setSelectedNotes([])
}
const restoreSelected = async() => {

  await Promise.all(
    selectedNotes.map((id)=>
      dbservice.restoreNote(id)
    )
  )

  const data =
    await dbservice.getTrashNotes(userId)

  dispatch(setNotes(data.rows))

  setSelectedNotes([])
}
    
  return (
    <>
    <div className={`min-h-screen py-8 w-11/12 mx-auto  ${theme==='light'? "bg-blue-50": "bg-slate-900"}`}>
    <div className={` w-full flex-1 flex items-center justify-center my-2 ${theme==='light'? "bg-blue-50": "bg-slate-900"}`}>
              <SearchBar />
            </div>
    <div className='flex w-full'>
        <input type="checkbox" name="select" id="select"
        checked={
          notes.length > 0 &&
          selectedNotes.length === notes.length}
          onChange={handleSelectAll}
        />
        <label htmlFor="select">Select all</label>
        {
  selectedNotes.length > 0 && (
    <>
      <Button onClick={restoreSelected}>
        Restore
      </Button>

      <Button onClick={deleteSelected}>
        Delete Permanently
      </Button>
    </>
  )
}
    </div>
    <div className='flex items-center'>
            <NotesList selectedNotes={selectedNotes}
setSelectedNotes={setSelectedNotes} />
        </div>
    </div>
    </>
  )
}

export default Trash
