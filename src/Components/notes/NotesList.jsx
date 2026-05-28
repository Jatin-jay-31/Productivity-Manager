import React from 'react'
import { useSelector } from 'react-redux'
import EmptyState from './EmptyState'
import NotesItem from './NotesItem'

function NotesList({selectedNotes,setSelectedNotes,handleSelectAll,setShowModal,handleCreateNote}) {
    const search = useSelector((state) => state.ui.searchTerm)
    const sortBy = useSelector((state) => state.ui.sortBy)
    const notes = useSelector((state) => state.note.notes)

    function getNotesList() {

        const filteredNotes = notes.filter((note) => {
            if (!note) return false

            if (search === "") {
                return true
            }

            return (
                note.title.toLowerCase().includes(search.toLowerCase()) ||
                note.content.toLowerCase().includes(search.toLowerCase())
            )
        })

        const sortedNotes = [...filteredNotes].sort((a, b) => {

            if (sortBy === 'Latest') {
                return new Date(b.$createdAt) - new Date(a.$createdAt)
            }

            else if (sortBy === 'Oldest') {
                return new Date(a.$createdAt) - new Date(b.$createdAt)
            }

            else if (sortBy === 'A-Z') {
                return a.title.localeCompare(b.title)
            }

            else if (sortBy === 'Z-A') {
                return b.title.localeCompare(a.title)
            }

            return 0
        })

        return sortedNotes
    }

    const finalNotes = getNotesList()

    return finalNotes.length === 0
        ? <EmptyState setShowModal={setShowModal} handleCreateNote={handleCreateNote} />
        : finalNotes.map((note) => (
            <NotesItem
                key={note.$id}
                note={note}
                selectedNotes={selectedNotes}
                setSelectedNotes={setSelectedNotes}
            />
        ))
}

export default NotesList