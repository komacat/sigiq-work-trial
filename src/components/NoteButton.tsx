'use client'

import { notesContext } from '@/context/notesContext'
import { useContext } from 'react'

export function NoteButton() {
    const { notes, toggleNotes } = useContext(notesContext)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.blur()
        toggleNotes()
    }

    return (
        <button onClick={handleClick}>
            <i className="bi bi-journal-text px-2 text-2xl"></i>
        </button>
    )
}
export default NoteButton
