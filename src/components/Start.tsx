"use client"
import emitter from "@/utils/emitter"

export function Start({ sessionActive, setSessionActive }: {sessionActive: boolean, setSessionActive: (arg0: boolean) => void}) {
    function handleStart() {
        if (!sessionActive) {
        console.log('client-done')
        emitter.emit('client-done')
        setSessionActive(true)

        } else {
            console.log("session active")
        }
    }
    if (!sessionActive) {
        return (
            <button className="m-4 bg-green-200 p-4" onClick={handleStart}>
                start
            </button>
        )
    } else {
        return (
            <button className="m-4 bg-gray-200 p-4">
                session in progress
            </button>
        )
    }
}