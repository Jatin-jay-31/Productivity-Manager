import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import NoteSlice from './slices/NoteSlice'
import { darkColors } from '../Constants/NoteColor'

const store= configureStore({
    reducer: {
        auth: authSlice,
        note: noteSlice,
        ui : uiSlice
    }
})

export default store