import React, { useState, useEffect } from 'react'
import { Textarea, Button } from '../Components/index'
import { useSelector } from 'react-redux'
import { lightColors, darkColors } from '../Constants/NoteColor'
import { useParams } from 'react-router-dom'
import { useNoteActions } from '../hooks/useNoteActions'
import toast from 'react-hot-toast'

function EditNote() {

  const { id } = useParams()

  const {
    editNote,
    togglePin,
    archiveNote,
    trashNote,
    loadingActions
  } = useNoteActions()

  const notes =
    useSelector(state => state.note.notes)

  const theme =
    useSelector(state => state.ui.theme)

  const note =
    notes.find(n => n.$id === id)

  const [notetitle, setNotetitle] =
    useState("")

  const [notecontent, setNotecontent] =
    useState("")

  const [savedUI, setSavedUI] =
    useState(false)

  const [trashClicked, setTrashClicked] =
    useState(false)
  const isDirty =
  note &&
  (
    notetitle !== note.title ||
    notecontent !== note.content
  )
  useEffect(() => {

  if (isDirty) {

    toast(
      "You have unsaved changes",
      {
        id: "unsaved-note",
        icon: "⚠️"
      }
    )

  } else {

    toast.dismiss("unsaved-note")

  }

}, [isDirty])

  useEffect(() => {

    if (note) {

      setNotetitle(note.title || "")
      setNotecontent(note.content || "")

    }

  }, [note])

  if (!note) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div
        className={`
min-h-screen
flex
justify-center
items-start
py-10
transition-colors
duration-200
${theme === "light"
            ? "bg-blue-50"
            : "bg-slate-900"}
`}
      >

        <div
          className={`
w-full
max-w-2xl
min-h-[82vh]
rounded-[2rem]
p-7
md:p-8
shadow-[0_20px_60px_rgba(0,0,0,0.15)]
border
backdrop-blur-sm
transition-all
duration-300
${theme === "light"
              ? lightColors[note.colorIndex]
              : darkColors[note.colorIndex]}
${theme === "light"
              ? "border-slate-200"
              : "border-white/10"}
`}
        >

          <div className='flex justify-end gap-2 mb-5'>

            <button
              className={`
cursor-pointer
transition-all
duration-200
hover:scale-110
active:scale-95
${note.isPinned
                  ? "opacity-100"
                  : "opacity-50"}
`}
              disabled={
                loadingActions[
                `${note.$id}_pin`
                ]
              }
              onClick={async () => {
  await togglePin(note)

}}
              
            >
              📌
            </button>

          </div>

          <input
            className={`
w-full
bg-transparent
outline-none
border-none
text-[2rem]
font-bold
leading-tight
mb-2
placeholder:opacity-60
${theme === "light"
                ? "text-slate-800 placeholder:text-slate-500"
                : "text-slate-100 placeholder:text-slate-400"}
`}
            value={notetitle}
            onChange={(e) =>
              setNotetitle(e.target.value)
            }
          />

          <Textarea
            rows={1}
            className="
w-full
my-4
text-base
leading-7
resize-none
overflow-hidden
bg-transparent
outline-none
border-none
min-h-[120px]
"
            value={notecontent}
            onChange={(e) =>
              setNotecontent(
                e.target.value
              )
            }
            onInput={(e) => {

              e.target.style.height =
                "auto"

              e.target.style.height =
                e.target.scrollHeight + "px"

            }}
          />

          <div className='flex justify-between items-center'>

            <p className='text-sm opacity-70 text-slate-700'>
              {note.createdOn}
            </p>

            <div className='flex gap-2'>

              <Button
                disabled={
                  loadingActions[
                  `${note.$id}_edit`
                  ]
                }
                onClick={async () => {


                  await editNote(
                    note,
                    {
                      title: notetitle,
                      content: notecontent
                    }
                  )

                  note.title =
                    notetitle

                  note.content =
                    notecontent

                  setSavedUI(true)

                  setTimeout(() => {
                    setSavedUI(false)
                  }, 1800)

                }}
              >

                {
                  savedUI
                    ? "✓ Saved"
                    : "💾 Save"
                }

              </Button>

              <button
                className={`
transition-all
duration-200
cursor-pointer
hover:scale-110
active:scale-95
disabled:opacity-50
disabled:cursor-not-allowed
disabled:hover:scale-100
`}
                disabled={trashClicked}
                onClick={async () => {

                  setTrashClicked(true)

                  await trashNote(note)

                }}
              >

                {
                  trashClicked
                    ? "Moved to Trash"
                    : "🗑️ Move to Trash"
                }

              </button>

              <button
                className='cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95'
                disabled={
                  loadingActions[
                  `${note.$id}_archive`
                  ]
                }
                onClick={async () => {

  await archiveNote(note)

}}
                
              >

                {
                  note.status === "archived"
                    ? "📦 Move to Active"
                    : "📥 Archive"
                }

              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  )
}

export default EditNote