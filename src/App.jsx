import { useState, useEffect } from 'react'
import './App.css'
import useNotes from './Context/NotesContext'
import { NotesProvider, NotesContext } from './Context/NotesContext'
import NotesForm from './Components/NotesForm'
import NotesItem from './Components/NotesItem'
import Search from './Components/Search'
import ThemeToggle from './Components/ThemeToggle'

function App() {
  const [notes, setNotes] = useState([])
  const [searchinput, setSearchInput] = useState("")
  const [sortType, setSortType] = useState("Latest")
  const[theme,setTheme]=useState("light")
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
    const filteredNotes=notes.filter((note)=>{
    if(note.title.includes(searchinput) || note.content.includes(searchinput)){
      return true
    }
  })
  const sortedNotes=[...filteredNotes].sort((a,b)=> {
      if(sortType==='Latest'){
        return b.createdAt-a.createdAt
      }
      else if(sortType==='Pinned'){
          return b.pinned-a.pinned
      }
      else if(sortType==='Oldest'){
        return a.createdAt-b.createdAt
      }}
)
 const toggleTheme=(e)=>{
  const status= e.currentTarget.checked
  if(status){
    setTheme("dark")
  }
  else{
    setTheme("light")
  }
 }


  return (
    <NotesProvider value={{ notes, addNote, updateNote, deleteNote, togglePin,toggleTheme,theme}}>
      <div className={`min-h-screen py-8 w-10/12 mx-auto  ${theme==='light'? "bg-blue-50": "bg-slate-900"}`}>
      <div className="flex items-center " >
        <div className={` W-9/12 flex-1 flex items-center justify-center my-4 ${theme==='light'? "bg-blue-50": "bg-slate-900"}`}>
          <Search searchinput={searchinput} setSearchInput={setSearchInput} setSortType={setSortType} sortType={sortType}/>
        </div>
        <div className='m-2 w-26 flex items-center'> 
          <ThemeToggle />
        </div>
      </div>
        <div className='flex flex-wrap gap-6 px-6'>
          {sortedNotes.map((note)=>(
          <div key={note.id}>
            <NotesItem note={note} />
            </div>
        ))}
        </div>
        <div className='flex px-6'>
          <NotesForm/>
        </div>
      </div>
    </NotesProvider>
  )
}

export default App
