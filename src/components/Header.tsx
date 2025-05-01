'use client'
import emitter from '@/utils/emitter'
import { themeContext } from '@/context/themeContext'
import { useContext } from 'react'

function Header() {
    const { theme, toggleTheme } = useContext(themeContext)
    return (
        <div className="flex h-24 w-full flex-row justify-between">
            <h1 className="text-2xl font-bold">demo</h1>
            <button onClick={toggleTheme}>toggle theme</button>
        </div>
    )
}
