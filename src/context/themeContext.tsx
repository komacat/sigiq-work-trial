'use client'

import { ThemeContext } from '@/lib/types'
import { createContext, useEffect, useState } from 'react'

export const themeContext = createContext<ThemeContext>({ theme: 'light', toggleTheme: () => {} })

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light'
        setTheme(savedTheme)
    }, [])

    function toggleTheme() {
        console.log('theme change')
        setTheme(theme === 'light' ? 'dark' : 'light')
        localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light')
    }
    return <themeContext.Provider value={{ theme, toggleTheme }}>{children}</themeContext.Provider>
}
export default ThemeContextProvider
