import React from 'react'
import { useSelector } from 'react-redux'
import {Button} from '../index'

function EmptyState({setShowModal,handleCreateNote}) {
  const theme= useSelector((state)=> state.ui.theme)
  return (
    <div
className={`w-full
flex
flex-col
items-center
justify-center
py-14
rounded-3xl
border
border-dashed
transition-all duration-200
${
theme==="light"
? "bg-white border-slate-300"
: "bg-slate-800 border-slate-600"
}`}
>

  <div className="text-5xl mb-3">
    📝
  </div>

  <h2
  className={`text-xl font-semibold
  ${
    theme==="light"
    ? "text-slate-700"
    : "text-slate-100"
  }`}
  >
    No notes yet
  </h2>

  <p
  className={`mt-2 text-center
  ${
    theme==="light"
    ? "text-slate-500"
    : "text-slate-400"
  }`}
  >
    Start by creating your first note.
  </p>

  <Button
    className="mt-5 rounded-xl px-5"
    onClick={ handleCreateNote}
  >
    Create Note
  </Button>

</div>
  )
}

export default EmptyState
