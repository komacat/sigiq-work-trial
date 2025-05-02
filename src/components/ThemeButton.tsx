'use client'

import { themeContext } from '@/context/themeContext'
import { useContext } from 'react'

export function ThemeButton() {
    const { theme, toggleTheme } = useContext(themeContext)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.blur()
        toggleTheme()
        console.log(theme)
    }

    return (
        <>
            {theme === 'light' ? (
                <button className="px-2" onClick={handleClick}>
                    <i className="bi bi-brightness-high text-2xl"></i>
                </button>
            ) : (
                <button className="px-2" onClick={handleClick}>
                    <i className="bi bi-moon text-2xl"></i>
                </button>
            )}
        </>
    )
}
export default ThemeButton
