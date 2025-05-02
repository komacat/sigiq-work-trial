'use client'
import { stateContext } from '@/context/stateContext'
import emitter from '@/utils/emitter'
import { useContext } from 'react'

export function Start() {
    const context = useContext(stateContext)

    function handleStart() {
        if (context.state === 'inactive') {
            emitter.emit('start')
            context.setState('tutor')
        }
    }
    if (context.state === 'inactive') {
        return (
            <button
                id="btnStart"
                className="rounded-3xl border-2 border-solid border-gray-300 p-4"
                onClick={handleStart}
            >
                Start session
            </button>
        )
    } else {
        return (
            <button className="flex items-center justify-center rounded-3xl border-2 border-solid border-gray-200 bg-gray-200 p-4 dark:border-slate-800 dark:bg-slate-800">
                Session in progress...
            </button>
        )
    }
}
export default Start
