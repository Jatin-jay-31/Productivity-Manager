import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice.js'
import noteSlice from './slices/noteSlice.js'
import uiSlice from './slices/uiSlice.js'
import { darkColors } from '../Constants/NoteColor'

const store= configureStore({
    reducer: {
        auth: authSlice,
        note: noteSlice,
        ui : uiSlice
    }
})

export default store