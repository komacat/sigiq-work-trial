'use client'
import { StateContext } from '@/lib/types'
import { createContext, useEffect, useState } from 'react'

export const stateContext = createContext<StateContext>({ state: 'client', setState: (arg0: string) => {} })

export function StateContextProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState('client')

    useEffect(() => {
        const savedState = localStorage.getItem('state') || 'client'
        setState(savedState)
        localStorage.setItem('state', 'client')
    }, [])

    return <stateContext.Provider value={{ state, setState }}>{children}</stateContext.Provider>
}
export default StateContextProvider
