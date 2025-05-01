'use client'
import { useEffect, useState, useContext } from 'react'
import { Start } from './Start'
import emitter from '@/utils/emitter'
import { stateContext } from '@/context/stateContext'

function Navigation() {
    const context = useContext(stateContext)

    const [sessionActive, setSessionActive] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)

    const [spaceDown, setSpaceDown] = useState(false)
    const [spaceUp, setSpaceUp] = useState(false)

    function downHandler(event: KeyboardEvent) {
        if (event.code === 'Space' && context.state === 'client') {
            console.log('spacedown')
            setSpaceDown(true)
        }
    }

    function upHandler(event: KeyboardEvent) {
        if (event.code === 'Space' && context.state === 'client') {
            console.log('spaceup')
            setSpaceUp(true)
        }
    }

    function monitorSpeech() {
        console.log('monitorspeech: ', context.state, sessionActive)
        if (sessionActive && context.state === 'client') {
            console.log('Test')
            if (spaceDown === true && spaceUp === false) {
                setIsSpeaking(true)
            } else if (spaceUp === true) {
                setIsSpeaking(false)
                setSpaceDown(false)
                setSpaceUp(false)
                emitter.emit('client-done')
            }
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

    return (
        <div className="flex h-24 w-full items-center justify-between bg-gray-200 px-8">
            <Start sessionActive={sessionActive} setSessionActive={setSessionActive} />
            <button className={isSpeaking ? 'm-4 bg-red-300 p-4' : 'm-4 bg-red-200 p-4'}>
                press space to speak
            </button>
        </div>
    )
}
export default Navigation
