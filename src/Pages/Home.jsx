import React, { useState, useEffect } from "react"
import { SearchBar, NotesForm, NotesList, Modal, EmptyState,Container } from "../Components/index"
import { useSelector, useDispatch } from "react-redux"
import dbservice from "../appwrite/database"
import { setNotes } from "../store/slices/noteSlice.js"
import { useNavigate, useLocation } from "react-router-dom"

function Home() {
  const userId = useSelector((state) => state.auth.userData?.$id)
  const theme = useSelector((state) => state.ui.theme)
  const notes = useSelector((state) => state.note.notes)
  const authStatus = useSelector((state) => state.auth.status)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [showModal, setShowModal] = useState(false)

  const handleCreateNote = () => {
    if (authStatus) {
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
    if (location.state?.openCreate) {
      setShowModal(true)

      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  useEffect(() => {
    if (!userId) return

    dbservice.getNotes(userId).then((data) => {
      dispatch(setNotes(data.rows))
    })
  }, [userId, dispatch])

  return (
  <div
    className={`min-h-screen py-8 w-11/12 mx-auto transition-colors duration-200 ${
      theme === "light" ? "bg-blue-50" : "bg-slate-900"
    }`}
  >

    <div className="w-full px-4 my-2">
      <SearchBar />
    </div>

    {notes.length === 0 && (
      <EmptyState
        icon="📝"
        title="No notes yet"
        message="Create your first note"
        buttonText="Create Note"
        onButtonClick={handleCreateNote}
      />
    )}

    {notes.length > 0 && (
      <div className="flex flex-wrap justify-center md:justify-start gap-2 w-full mx-auto px-2 sm:px-0">
        <NotesList
          setShowModal={setShowModal}
          handleCreateNote={handleCreateNote}
        />
      </div>
    )}

    {notes.length > 0 && (
      <div className="mt-6 flex justify-center md:justify-start w-full">
        <NotesForm setShowModal={setShowModal} />
        </div>
    )}

    {showModal && (
      <Modal onClose={() => setShowModal(false)}>
        <NotesForm setShowModal={setShowModal} />
      </Modal>
    )}

  </div>
)
}

export default Home