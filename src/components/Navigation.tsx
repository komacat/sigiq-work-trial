'use client'
import Start from './Start'
import AudioInput from './AudioInput'
import NoteButton from './NoteButton'

function Navigation() {
    return (
        <div className="flex h-24 w-full items-center justify-between bg-gray-200 px-8">
            <Start />
            <AudioInput />
            <div className="flex flex-row">
                <NoteButton />
            </div>
        </div>
    )
}
export default Navigation
