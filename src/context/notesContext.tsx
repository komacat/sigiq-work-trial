'use client'

import { NoteContext } from '@/lib/types'
import { createContext, useEffect, useState } from 'react'

export const notesContext = createContext<NoteContext>({ notes: false, toggleNotes: () => {} })

export function NoteContextProvider({ children }: { children: React.ReactNode }) {
    const [notes, setNotes] = useState<boolean>(false)

    function toggleNotes() {
        console.log('notes toggle')
        setNotes(notes === false ? true : false)
    }

    return <notesContext.Provider value={{ notes, toggleNotes }}>{children}</notesContext.Provider>
}
export default NoteContextProvider
