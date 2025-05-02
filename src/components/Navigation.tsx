'use client'
import Start from './Start'
import AudioInput from './AudioInput'
import NoteButton from './NoteButton'
import ThemeButton from './ThemeButton'

function Navigation() {
    return (
        <div className="flex h-24 w-full items-center justify-between px-8">
            <Start />
            <AudioInput />
            <div className="flex flex-row">
                <NoteButton />
                <ThemeButton />
            </div>
        </div>
    )
}
export default Navigation
