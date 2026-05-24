import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    theme : 'light',
    sortBy : 'newest',
    searchTerm: "",
    currentView: 'all'
}

const uiSlice= createSlice({
    name: 'ui',
    initialState,
    reducers:{
        setTheme: (state,action)=>{
            state.theme= action.payload
        },
        setSortBy:(state,action)=>{
            state.sortBy= action.payload
        },
        setSearchTerm:(state,action)=>{
            state.searchTerm= action.payload
        },
        setCurrentView:(state,action)=>{
            state.currentView =action.payload
        }
    }
})
export const {setTheme,setSortBy,setSearchTerm,setCurrentView}= uiSlice.actions
export default uiSlice.reducer