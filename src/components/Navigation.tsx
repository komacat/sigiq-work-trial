'use client'
import { useEffect, useState } from 'react'
import { Start } from './Start'
import AudioInput from './AudioInput'

function Navigation() {
    return (
        <div className="flex h-24 w-full items-center justify-between bg-gray-200 px-8">
            <Start />
            <AudioInput />
        </div>
    )
}
export default Navigation
