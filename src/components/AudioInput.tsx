'use client'

import { stateContext } from '@/context/stateContext'
import { useContext, useEffect, useRef, useState } from 'react'
import type { Interaction, StateContext } from '@/lib/types'
import emitter from '@/utils/emitter'
import { audioToBase64 } from '@/utils/encode'

function AudioInput() {
    const context: StateContext = useContext(stateContext)
    const contextRef = useRef(context)
    console.log('context: ', context, context.state)

    const [isRecording, setIsRecording] = useState<boolean>(false)
    const mediaStream = useRef<MediaStream>(null)
    const mediaRecorder = useRef<MediaRecorder>(null)
    const chunks = useRef<Blob[]>([])

    const [spaceDown, setSpaceDown] = useState(false)
    const [spaceUp, setSpaceUp] = useState(false)

    function downHandler(event: KeyboardEvent) {
        console.log('hi', contextRef.current.state, spaceDown, spaceUp)
        console.log('down ', contextRef.current.state)
        if (event.code === 'Space' && contextRef.current.state === 'client') {
            setSpaceDown(true)
        }
    }

    function upHandler(event: KeyboardEvent) {
        console.log('up ', contextRef.current.state)
        if (event.code === 'Space' && contextRef.current.state === 'client') {
            setSpaceUp(true)
            setSpaceDown
        }
    }

    function monitorSpeech() {
        console.log('hi monitor', contextRef.current.state, spaceDown, spaceUp)
        if (contextRef.current.state === 'client') {
            if (spaceDown === true && spaceUp === false) {
                setIsRecording(true)
            } else if (spaceUp === true) {
                setIsRecording(false)
                setSpaceDown(false)
                setSpaceUp(false)
                emitter.emit('client-done')
                console.log('contextttt', contextRef.current.state)
            }
        }
    }

    async function startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            mediaStream.current = stream
            mediaRecorder.current = new MediaRecorder(stream)

            console.log(mediaStream.current)
            console.log(mediaRecorder.current)

            mediaRecorder.current.ondataavailable = (e: BlobEvent) => {
                if (e.data.size > 0) {
                    chunks.current.push(e.data)
                }
            }
            mediaRecorder.current.onstop = () => {
                console.log(chunks.current)
                const recordedBlob = new Blob(chunks.current, { type: 'audio/webm' })
                const url = URL.createObjectURL(recordedBlob)
                console.log(url)
                audioToBase64(url).then((base64Audio) => {
                    console.log(base64Audio)
                    const data: Interaction = {
                        interaction: 'speech',
                        payload: {
                            chunk: base64Audio as string, // uhhh
                            mimeType: 'audio/webm',
                        },
                        isLast: true, // client can only send 1 response
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
        contextRef.current = context
    }, [context])

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
    }, [spaceDown, spaceUp, contextRef.current.state])

    return (
        <>
            <button
                id="btnMic"
                className={
                    isRecording
                        ? 'rounded-3xl border-2 border-solid border-gray-400 bg-gray-400 p-4'
                        : 'rounded-3xl border-2 border-solid border-gray-400 bg-gray-200 p-4'
                }
            >
                press space to speak
            </button>
        </>
    )
}
export default AudioInput
