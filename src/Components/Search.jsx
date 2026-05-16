import React,{useState} from 'react'
import useNotes from '../Context/NotesContext'

function Search({searchinput,setSearchInput,sortType,setSortType}) {
  const{theme}=useNotes()

  return (
    <>
    <div className={`flex items-center justify-center w-11/12 border border-slate-700 ${theme==='light'? "bg-white": "bg-slate-800"} transition-all duration-200 rounded-2xl p-2`}>
    <input type="text" placeholder='Search a note..' className={`p-3 outline-none flex-1 placeholder:text-slate-400 bg-transparent ${theme==='light'
  ? "text-slate-700"
  : "text-slate-100"} focus:ring-2 focus:ring-blue-300 rounded-xl transition-all duration-200`}
    value={searchinput}
    onChange={(e)=> setSearchInput(e.target.value)}
    />
    <select name="sortType" id="sortType" className={`p-3 rounded-2xl focus:ring-2 focus:ring-blue-300 outline-none mx-4 cursor-pointer transition-all duration-200 ${theme==='light'
  ? "text-slate-700"
  : "text-slate-100"} `} value={sortType} onChange={(e)=> setSortType(e.target.value)}>
      <option value="Latest" className={`${theme==='light'? "text-slate-700 bg-white": "text-white bg-slate-800"}`}>Latest</option>
      <option value="Oldest" className={`${theme==='light'? "text-slate-700 bg-white": "text-white bg-slate-800"}`}>Oldest</option>
      <option value="Pinned" className={`${theme==='light'? "text-slate-700 bg-white": "text-white bg-slate-800"}`}>Pinned</option>
    </select>
    </div>
    </>
  )
}

export default Search
