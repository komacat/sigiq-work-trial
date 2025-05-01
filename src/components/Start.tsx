"use client"

import emitter from '@/utils/emitter'
import { Navigate } from 'react-router-dom'

function Start() {
    function handleStart() {
        console.log('client-done')
        emitter.emit('client-done', null)
    }
    return (
        <div className="flex h-full w-full items-center justify-between bg-gray-200 px-8">
            <button className="m-4 bg-green-200 p-4" onClick={handleStart}>
                start
            </button>
        </div>
    )
}
export default Start
