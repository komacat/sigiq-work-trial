'use client'
import { stateContext } from '@/context/stateContext'
import emitter from '@/utils/emitter'
import { useContext } from 'react'

export function Start() {
    const context = useContext(stateContext)

    function handleStart() {
        if (context.state === 'inactive') {
            console.log('start')
            emitter.emit('start')
            context.setState('tutor')
        } else {
            console.log('session active')
        }
    }
    if (context.state === 'inactive') {
        return (
            <button
                id="btnStart"
                className="rounded-3xl border-2 border-solid border-gray-400 p-4"
                onClick={handleStart}
            >
                start
            </button>
        )
    } else {
        return (
            <button className="rounded-3xl border-2 border-solid border-gray-300 bg-gray-300 p-4">
                session in progress
            </button>
        )
    }
}
export default Start
