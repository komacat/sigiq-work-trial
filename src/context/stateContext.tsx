'use client'
import { StateContext } from '@/lib/types'
import { createContext, useEffect, useState } from 'react'

export const stateContext = createContext<StateContext>({
    state: 'inactive',
    setState: (arg0: string) => {},
})

export function StateContextProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState('inactive')

    useEffect(() => {
        // localStorage.setItem('state','inactive')
        // const savedState = localStorage.getItem('state') || 'inactive'
        // setState(savedState)
    }, [])

    return <stateContext.Provider value={{ state, setState }}>{children}</stateContext.Provider>
}
export default StateContextProvider
