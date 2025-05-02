'use client'
import emitter from '@/utils/emitter'
import connect from '@/utils/websocket'

export function Start({
    sessionActive,
    setSessionActive,
}: {
    sessionActive: boolean
    setSessionActive: (arg0: boolean) => void
}) {
    function handleStart() {
        if (!sessionActive) {
            console.log('next-instruction')
            emitter.emit('next-instruction')
            setSessionActive(true)
            connect()
        } else {
            console.log('session active')
        }
    }
    if (!sessionActive) {
        return (
            <button className="border-gray-400 border-solid border-2 rounded-3xl p-4" onClick={handleStart}>
                start
            </button>
        )
    } else {
        return <button className="border-gray-300 border-solid border-2 bg-gray-300 rounded-3xl p-4">session in progress</button>
    }
}
