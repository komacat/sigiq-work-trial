'use client'
import { useState } from 'react'
import { Start } from './Start'
import AudioInput from './AudioInput'

function Navigation() {
    const [sessionActive, setSessionActive] = useState<boolean>(false)

    return (
        <div className="flex h-24 w-full items-center justify-between bg-gray-200 px-8">
            <Start sessionActive={sessionActive} setSessionActive={setSessionActive} />
            <AudioInput sessionActive={sessionActive} />
        </div>
    )
}
export default Navigation
