import { useContext,createContext } from "react";

export const NotesContext= createContext({
    notes:[{
        id: Date.now(),
        createdOn: new Date().toLocaleDateString(),
        title:"",
        content: "",
        pinned: false,

    }],
    addNote: (note)=>{},
    updateNote: (id,note)=>{},
    deleteNote:(id)=>{},
    togglePin:(id)=>{}
})

export const NotesProvider=NotesContext.Provider
export default function useNotes(){
    return useContext(NotesContext)
}