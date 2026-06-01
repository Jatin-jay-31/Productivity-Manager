import React, { useState } from 'react'
import { lightColors, darkColors } from '../../Constants/NoteColor'
import { useSelector, useDispatch } from 'react-redux'
import { addNote, setError } from '../../store/slices/noteSlice.js'
import dbservice from '../../appwrite/database'
import { Button, Input, Textarea } from '../index'
import toast from "react-hot-toast"

function NotesForm({ setShowModal }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const theme = useSelector((state) => state.ui.theme)
  const userId = useSelector((state) => state.auth.userData?.$id)
  const dispatch = useDispatch()

const add = async (e) => {
  e.preventDefault();
  if (!title || !content || !userId) {
    console.log("Validation failed");
    return;
  }

  dispatch(setError(""));

  try {
    console.log("Creating note...");

    const newNote = await dbservice.createNote({
      title,
      content,
      userId,
      status: "active",
      isPinned: false,
      colorIndex: Math.floor(Math.random() * lightColors.length),

    });


    const safeNote = {
      $id: newNote.$id,
      title: newNote.title || title,
      content: newNote.content || content,
      userId,
      status: newNote.status || "active",
      isPinned: newNote.isPinned || false,
      colorIndex: newNote.colorIndex ?? 0,
      $createdAt: newNote.$createdAt,
      $updatedAt: newNote.$updatedAt
    };

    dispatch(addNote(safeNote));

    toast.success("Note created");

    setTitle("");
    setContent("");

    if(setShowModal){
      setShowModal(false);
    }

  } catch (error) {
    dispatch(setError(error.message));
    toast.error(error.message);
  }
};
return (
  <>
    <form onSubmit={add} className={`flex items-center  flex-col border border-slate-700 ${theme === 'light' ? "bg-white" : "bg-slate-800"} 
     w-60 rounded-2xl  m-4 p-4 gap-5 shadow-md hover:-translate-y-1 shadow-xl transition-all duration-200`}>
      <Input className={`p-2 px-3 `} type="text" placeholder='Add note title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea className={`p-2 px-3 `} placeholder="Write your note..." value={content}
        onChange={(e) => setContent(e.target.value)} />
      <Button type="submit" className={`w-20 ${theme === 'light' ? "bg-slate-700 hover:bg-slate-900 " : " bg-blue-500 hover:bg-blue-700"}  text-white p-2 rounded-2xl cursor-pointer 
active:scale-95
transition-all`}
      >Add</Button>
    </form>
  </>
)
}

export default NotesForm
