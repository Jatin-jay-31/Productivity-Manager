import { useState, useEffect } from 'react'
import './App.css'
import useNotes from './Context/NotesContext'
import { NotesProvider, NotesContext } from './Context/NotesContext'
import NotesForm from './Components/NotesForm'
import NotesItem from './Components/NotesItem'
import Search from './Components/Search'

function App() {
  const [notes, setNotes] = useState([])
  const [searchinput, setSearchInput] = useState("")
  const addNote = (note) => {
    setNotes((prev) => ([{ id: Date.now(), ...note }, ...prev]))
  }
  const updateNote = (id, note) => {
    setNotes((prev) => prev.map((prevNote) =>
      prevNote.id === id ? note : prevNote
    ))
  }
  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((prevNote) =>
      prevNote.id !== id
    ))
  }
  const filteredNotes=notes.filter((note)=>{
    if(note.title.includes(searchinput) || note.content.includes(searchinput)){
      return true
    }
  })
  const togglePin = (id) => {
    setNotes((prev) => prev.map((prevNote) =>
      prevNote.id === id ?
        { ...prevNote, pinned: !prevNote.pinned } : prevNote
    ))
  }
  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes"))
    if (notes && notes.length > 0) {
      setNotes(notes)
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))

  }, [notes])

  return (
    <NotesProvider value={{ notes, addNote, updateNote, deleteNote, togglePin }}>
      <div className='min-h-screen py-8 w-10/12 mx-auto bg-blue-50'>
      <Search searchinput={searchinput} setSearchInput={setSearchInput}/>
        <div className='flex items-center  flex-wrap gap-6 '>
          {filteredNotes.map((note)=>(
          <div key={note.id}>
            <NotesItem note={note}/>
            </div>
        ))}
        <NotesForm/>
      </div>
      
      </div>
    </NotesProvider>
  )
}

export default App
