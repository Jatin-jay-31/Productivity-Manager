import { useDispatch } from "react-redux"
import dbservice from "../appwrite/database"
import { updateNote } from "../store/slices/noteSlice"
import toast from "react-hot-toast"
import { useState } from "react"

export const useNoteActions = () => {

    const [loadingActions, setLoadingActions] = useState({})
    const dispatch = useDispatch()

    const setLoading = (key, value) => {
        setLoadingActions(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const togglePin = async (note) => {

        const key = `${note.$id}_pin`
        if (loadingActions[key]) return

        setLoading(key, true)

        const previous = { ...note }
        const updated = {
            ...note,
            isPinned: !note.isPinned
        }

        try {

            dispatch(updateNote(updated))

            await dbservice.pinNote(
                note.$id,
                updated.isPinned
            )

            toast.success(
                updated.isPinned
                    ? "Pinned 📌"
                    : "Unpinned",
                { duration: 2000 }
            )

        } catch (error) {

            dispatch(updateNote(previous))

            toast.error(
                "Failed to update pin"
            )

        } finally {

            setLoading(key, false)
        }
    }

    const archiveNote = async (note) => {

        const key = `${note.$id}_archive`
        if (loadingActions[key]) return

        setLoading(key, true)

        const previous = { ...note }

        const updated = {
            ...note,
            status:
                note.status === "archived"
                    ? "active"
                    : "archived"
        }

        try {

            dispatch(updateNote(updated))

            if (updated.status === "archived") {
                await dbservice.archiveNote(note.$id)
            } else {
                await dbservice.restoreNote(note.$id)
            }

            toast.success(
                updated.status === "archived"
                    ? "Archived 📦"
                    : "Moved to Active",
                { duration: 2000 }
            )

        } catch (error) {

            dispatch(updateNote(previous))

            toast.error(
                "Archive action failed"
            )

        } finally {

            setLoading(key, false)
        }
    }

    const trashNote = async (note) => {

        const key = `${note.$id}_trash`
        if (loadingActions[key]) return

        setLoading(key, true)

        const previous = { ...note }

        const updated = {
            ...note,
            status: "trash"
        }

        try {

            dispatch(updateNote(updated))

            await dbservice.trashNote(note.$id)

            toast.success(
                "Moved to Trash 🗑️",
                { duration: 2000 }
            )

        } catch (error) {

            dispatch(updateNote(previous))

            toast.error(
                "Failed to move note"
            )

        } finally {

            setLoading(key, false)
        }
    }

    const editNote = async (note, data) => {

        const key = `${note.$id}_edit`
        if (loadingActions[key]) return

        setLoading(key, true)

        const previous = { ...note }

        try {

            const updatedNote =
                await dbservice.updateNote(
                    note.$id,
                    data
                )

            const safeNote = {
  $id: updatedNote.$id,
  title: updatedNote.title,
  content: updatedNote.content,
  status: updatedNote.status,
  isPinned: updatedNote.isPinned,
  userId: updatedNote.userId,
  colorIndex: updatedNote.colorIndex,
  createdOn: updatedNote.createdOn
}

dispatch(updateNote(safeNote))

            toast.success(
                "Note saved 💾",
                { duration: 2000 }
            )

        } catch (error) {

            dispatch(updateNote(previous))

            toast.error(
                "Can't save note"
            )

        } finally {

            setLoading(key, false)
        }
    }

    return {
        togglePin,
        archiveNote,
        trashNote,
        editNote,
        loadingActions
    }
}