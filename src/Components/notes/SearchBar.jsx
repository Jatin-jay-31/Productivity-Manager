import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { setSearchTerm,setSortBy,setCurrentView } from '../../store/slices/uiSlice.js'
import Button from '../ui/Button'
import dbservice from '../../appwrite/database'
import { setNotes } from '../../store/slices/noteSlice'

function Search() {
  const dispatch=useDispatch()
  const search= useSelector((state)=> state.ui.searchTerm)
  const sort= useSelector((state)=> state.ui.sortBy)
  const theme= useSelector((state)=> state.ui.theme)
  const currentView= useSelector((state)=> state.ui.currentView)
  const userId= useSelector((state)=> state.auth.userData?.$id)

  const searchNote=(e)=>{
    dispatch(setSearchTerm(e.target.value))
  }
  const sortNote=(e)=>{
    dispatch(setSortBy(e.target.value))
  }
  const filterBy=(e)=>{
  dispatch(setCurrentView(e.target.value))
  }

  return (
  <>
    <div
      className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full overflow-hidden border border-slate-700 ${
        theme === 'light'
          ? "bg-white"
          : "bg-slate-800"
      } transition-all duration-200 rounded-2xl p-2`}
    >

      <input
        type="text"
        placeholder="Search a note.."
        className={`p-3 outline-none flex-1 min-w-0 bg-transparent rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-300 ${
          theme === 'light'
            ? "text-slate-700 placeholder:text-slate-500"
            : "text-slate-100 placeholder:text-slate-400"
        }`}
        value={search}
        onChange={searchNote}
      />

      <select
        name="sortType"
        id="sortType"
        value={sort}
        onChange={sortNote}
        className={`w-full sm:w-auto p-3 rounded-2xl outline-none cursor-pointer transition-all duration-200 focus:ring-2 focus:ring-blue-300 ${
          theme === 'light'
            ? "text-slate-700"
            : "text-slate-100 bg-slate-800"
        }`}
      >
        <option
          value="Latest"
          className={`${theme === 'light'
            ? "text-slate-700 bg-white"
            : "text-white bg-slate-800"}`}
        >
          Latest
        </option>

        <option
          value="Oldest"
          className={`${theme === 'light'
            ? "text-slate-700 bg-white"
            : "text-white bg-slate-800"}`}
        >
          Oldest
        </option>

        <option
          value="A-Z"
          className={`${theme === 'light'
            ? "text-slate-700 bg-white"
            : "text-white bg-slate-800"}`}
        >
          A-Z
        </option>

        <option
          value="Z-A"
          className={`${theme === 'light'
            ? "text-slate-700 bg-white"
            : "text-white bg-slate-800"}`}
        >
          Z-A
        </option>
      </select>

    </div>
  </>
)
}

export default Search
