'use client'

import { notesContext } from '@/context/notesContext'
import { useContext } from 'react'

export function NoteButton() {
    const { notes, toggleNotes } = useContext(notesContext)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.blur()
        toggleNotes()
    }

    return <button onClick={handleClick}>notes</button>
}
export default NoteButton
