import { createSlice } from "@reduxjs/toolkit";


const initialState={
    notes: [],
    loading: false,
    error: null
}
const noteSlice= createSlice({
    name: "note",
    initialState,
    reducers:{
        addNote:(state,action)=>{
            state.notes.push(action.payload)
        },
        updateNote:(state,action)=>{
            state.notes= state.notes.map((note)=> 
                note.$id === action.payload.$id ? { ...note, ...action.payload } : note)
        },
        removeNote:(state,action)=>{
            state.notes = state.notes.filter((note)=>
                note.$id !== action.payload.$id 
            )
        },
        setNotes: (state,action)=>{
            state.notes= action.payload
        },
        setLoading:(state,action)=>{
             state.loading =action.payload
        },
        setError: (state,action)=>{
             state.error= action.payload
        },
        clearNotes: (state)=>{
            state.notes = []
        }
    }
})
export const{addNote,updateNote,removeNote,setNotes,clearNotes,setLoading,setError}= noteSlice.actions
export default noteSlice.reducer
