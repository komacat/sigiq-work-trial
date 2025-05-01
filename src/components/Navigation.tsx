'use client'
import emitter from '@/utils/emitter'
import { useEffect, useRef, useState } from 'react'

function Navigation() {
    const [spaceDown, setSpaceDown] = useState(false)
    const [spaceUp, setSpaceUp] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)

    function downHandler(event: KeyboardEvent) {
        if (event.code === 'Space') {
            setSpaceDown(true)
        }
    }

    function upHandler(event: KeyboardEvent) {
        if (event.code === 'Space') {
            setSpaceUp(true)
        }
    }

    function handleStart() {
        console.log('client-done')
        emitter.emit('client-done', null)
    }

    function monitorSpeech() {
        if (spaceDown === true && spaceUp === false) {
            setIsSpeaking(true)
        } else if (spaceUp === true) {
            setIsSpeaking(false)
            setSpaceDown(false)
            setSpaceUp(false)
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', downHandler)
        window.addEventListener('keyup', upHandler)
        return () => {
            window.removeEventListener('keydown', downHandler)
            window.removeEventListener('keyup', upHandler)
        }
    }, [])

    useEffect(() => {
        monitorSpeech()
    }, [spaceDown, spaceUp])

    useEffect(() => {
        console.log(isSpeaking)
    }, [isSpeaking])

    return (
        <div className="flex h-24 w-full items-center justify-between bg-gray-200 px-8">
            <button className="m-4 bg-green-200 p-4" onClick={handleStart}>
                start
            </button>
            <button className={isSpeaking ? 'bg-red-300 m-4 p-4' : 'bg-red-200 m-4 p-4'}>press space to speak</button>
        </div>
    )
}
export default Navigation
