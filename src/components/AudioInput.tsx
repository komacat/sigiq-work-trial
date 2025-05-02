'use client'

import { stateContext } from '@/context/stateContext'
import { useContext, useEffect, useRef, useState } from 'react'
import type { Interaction, StateContext } from '@/lib/types'
import emitter from '@/utils/emitter'
import { audioToBase64 } from '@/utils/encode'

function AudioInput({ sessionActive }: { sessionActive: boolean }) {
    const context: StateContext = useContext(stateContext)

    const [isRecording, setIsRecording] = useState<boolean>(false)
    const [recordedUrl, setRecordedUrl] = useState<string>('')
    const mediaStream = useRef<MediaStream>(null)
    const mediaRecorder = useRef<MediaRecorder>(null)
    const chunks = useRef<Blob[]>([])

    const [spaceDown, setSpaceDown] = useState(false)
    const [spaceUp, setSpaceUp] = useState(false)

    function downHandler(event: KeyboardEvent) {
        console.log("down ", context.state)
        if (event.code === 'Space' && context.state === 'client') {
            setSpaceDown(true)
        }
    }

    function upHandler(event: KeyboardEvent) {
        console.log("up ", context.state)
        if (event.code === 'Space' && context.state === 'client') {
            setSpaceUp(true)
        }
    }

    function monitorSpeech() {
        if (sessionActive && context.state === 'client') {
            if (spaceDown === true && spaceUp === false) {
                setIsRecording(true)
            } else if (spaceUp === true) {
                setIsRecording(false)
                setSpaceDown(false)
                setSpaceUp(false)
                emitter.emit('client-done')
            }
        }
    }

    async function startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            mediaStream.current = stream
            mediaRecorder.current = new MediaRecorder(stream)

            mediaRecorder.current.ondataavailable = (e: BlobEvent) => {
                if (e.data.size > 0) {
                    chunks.current.push(e.data)
                }
            }
            mediaRecorder.current.onstop = () => {
                const recordedBlob = new Blob(chunks.current, { type: 'audio/webm' })
                const url = URL.createObjectURL(recordedBlob)
                setRecordedUrl(url)
                console.log('recorded url: ', recordedUrl)
                audioToBase64(recordedUrl).then((base64Audio) => {
                    console.log(base64Audio)
                    const data: Interaction = {
                        interaction: 'speech',
                        payload: {
                            chunk: base64Audio as string, // uhhh
                        },
                        isLast: true // client can only send 1 response
                    }
                    emitter.emit('speech', data)
                })
                chunks.current = []
            }
            mediaRecorder.current.start()
        } catch (err) {
            console.error(`Error using microphone: ${err}`)
        }
    }

    const stopRecording = () => {
        if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
            mediaRecorder.current.stop()
        }
    }

    useEffect(() => {
        if (isRecording) {
            startRecording()
        } else {
            stopRecording()
        }
    }, [isRecording])

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
        <>
            <button
                id="btnMic"
                className={isRecording ? 'm-4 bg-red-300 p-4' : 'm-4 bg-red-200 p-4'}
            >
                press space to speak
            </button>
        </>
    )
}
export default AudioInput
