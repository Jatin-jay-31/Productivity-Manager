import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import noteSlice from './slices/noteSlice'
import uiSlice from './slices/uiSlice'
import { darkColors } from '../Constants/NoteColor'

const store= configureStore({
    reducer: {
        auth: authSlice,
        note: noteSlice,
        ui : uiSlice
    }
})

export default store