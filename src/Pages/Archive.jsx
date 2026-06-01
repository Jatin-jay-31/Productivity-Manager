import React, { useEffect, useState } from 'react'
import { NotesList, SearchBar, NotesItem, EmptyState,Loader } from '../Components/index'
import dbservice from '../appwrite/database'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../Components/index'
import { setNotes,setLoading,setError }from "../store/slices/noteSlice.js"
import toast from 'react-hot-toast'

function Archive() {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.auth.userData?.$id)
  const theme = useSelector((state) => state.ui.theme)
  const notes = useSelector((state) => state.note.notes)
  const [selectedNotes, setSelectedNotes] = useState([])
  const loading =useSelector((state)=>state.note.loading)
  const error =useSelector((state)=>state.note.error)
  useEffect(() => {

  const fetchTrash = async() => {

    dispatch(setLoading(true))

    try {

      const data =
      await dbservice.getArchivedNotes(userId)

      dispatch(setNotes(data.rows))
      dispatch(setError(null))
      

    } catch(error){

      dispatch(
        setError(
          "Failed to load Archive"
        )
      )
      toast.error("Failed to restore notes")

    } finally {

      dispatch(setLoading(false))
    }
  }

  if(userId){
    fetchTrash()
  }

}, [userId, dispatch])
if(loading){
    return <Loader />
  }
if(error){
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500">
        {error}
      </p>
    </div>
  )
}

  const handleSelectAll = () => {

    if (
      selectedNotes.length === notes.length
    ) {
      setSelectedNotes([])
    } else {
      setSelectedNotes(
        notes.map(note => note.$id)
      )
    }


  }
  const restoreSelected = async() => {

  setError("")

  try {

    await Promise.all(
      selectedNotes.map((id) =>
        dbservice.restoreNote(id)
      )
    )

    const data =
      await dbservice.getArchivedNotes(userId)

    dispatch(setNotes(data.rows))

    setSelectedNotes([])

    toast.success(
      "Notes restored",
      { duration: 2000 }
    )

  } catch(error){

    setError(error.message)
    toast.error(
      "Failed to restore notes"
    )
  }
}

  return (
    <>
      <div className={`min-h-screen py-8 w-11/12 mx-auto transition-colors duration-200 
${theme === 'light' ? "bg-blue-50" : "bg-slate-900"}`}>

        <div className={`w-full px-4 mb-4 my-4 transition-colors duration-200 
  ${theme === 'light' ? "bg-blue-50" : "bg-slate-900"}`}>
          <SearchBar />
        </div>
        {notes.length === 0 ? (
          <EmptyState
            icon="📦"
            title="Archive is empty"
            message="Archived notes will appear here"
          />
        )
          : <>
            <div className="mb-6 px-4">
              <h1 className={`text-3xl font-bold mb-1
    ${theme === 'light' ? "text-slate-700" : "text-slate-100"}`}>
                📦 Archive
              </h1>

              <p className={`text-sm opacity-80
    ${theme === 'light' ? "text-slate-600" : "text-slate-300"}`}>
                Archived notes are stored here.
              </p>
            </div>

            <div
              className={`
    mx-4
    mb-6
    rounded-2xl
    px-4
    py-3
    border
    flex
    flex-col
    gap-3
    transition-colors
    duration-200
    ${theme === 'light'
                  ? "bg-white border-slate-200"
                  : "bg-slate-800 border-slate-700"
                }
  `}
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="select"
                    checked={
                      notes.length > 0 &&
                      selectedNotes.length === notes.length
                    }
                    onChange={handleSelectAll}
                    className="cursor-pointer"
                  />

                  <label
                    htmlFor="select"
                    className={`cursor-pointer text-sm font-medium
          ${theme === 'light'
                        ? "text-slate-700"
                        : "text-slate-200"}`}
                  >
                    Select All
                  </label>
                </div>

                {selectedNotes.length > 0 && (
                  <span
                    className={`text-sm font-medium
          ${theme === 'light'
                        ? "text-slate-600"
                        : "text-slate-300"}`}
                  >
                    {selectedNotes.length} selected
                  </span>
                )}
              </div>

              {selectedNotes.length > 0 && (
                <div className="flex gap-3">

                  <Button
                    onClick={restoreSelected}
                  >
                    Restore
                  </Button>

                </div>
              )}
            </div>

            <div className="flex flex-wrap">
              <NotesList
                selectedNotes={selectedNotes}
                setSelectedNotes={setSelectedNotes}
              />
            </div>
          </>
        }
      </div>
    </>
  )
}

export default Archive
