'use client'

import { Interaction, StateContext } from '@/lib/types'
import emitter from '../utils/emitter'
import { playAudio, pointTo } from '../utils/instructions'
import { useContext, useEffect, useRef, useState } from 'react'

import { stateContext } from '@/context/stateContext'

export function Websocket() {
    const context: StateContext = useContext(stateContext)

    const [connected, setConnected] = useState(false)
    const reconnectAttemptsRef = useRef(0)
    const socketRef = useRef<WebSocket | null>(null)

    const maxReconnectDelay = 30000

    function connect() {
        const ws = new WebSocket('ws://localhost:8080')
        socketRef.current = ws

        ws.onopen = function () {
            console.log('Client connected')
            setConnected(true)
            reconnectAttemptsRef.current = 0
            ws.send(JSON.stringify({ message: 'next-instruction' }))
        }

        ws.onmessage = (message) => {
            console.log('event: ', message.data)
            const data = JSON.parse(message.data)
            if (data.message === 'script-done') {
                console.log("setting state to inactive")
                context.setState('inactive')
            }
            switch (data.interaction) {
                case 'point':
                    emitter.emit('point', data)
                    break
                case 'audio':
                    emitter.emit('audio', data)
                    break
            }
        }

        ws.onclose = function (e) {
            console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason)
            setConnected(false)
            scheduleReconnect()
        }

        ws.onerror = function (err: Event) {
            console.error('Socket encountered error: ', err, 'Closing socket')
            ws.close()
        }
    }

    const scheduleReconnect = () => {
        reconnectAttemptsRef.current += 1
        const delay = Math.min(1000 * 2 ** reconnectAttemptsRef.current, maxReconnectDelay)
        setTimeout(() => {
            connect()
        }, delay)
    }

    useEffect(() => {
        emitter.on('start', () => {
            connect()
        })

        // emitters for main instructions

        emitter.on('point', async (event) => {
            const i = event as Interaction
            console.log(i)
            await pointTo(i.payload.elementId as string) // uhhh
            if (i.isLast === false) {
                socketRef.current?.send(JSON.stringify({ message: 'next-instruction' }))
            } else {
                emitter.emit('tutor-done')
            }
        })

        emitter.on('speech', (data) => {
            socketRef.current?.send(JSON.stringify({ message: 'client-response', data: data }))
        })

        emitter.on('audio', async (event) => {
            const i = event as Interaction
            console.log('audio emitter')
            console.log(i.payload.chunk)
            console.log(i.payload.mimeType)
            if (i.payload.chunk && i.payload.mimeType) {
                await playAudio(i.payload.chunk, i.payload.mimeType)
            }
            if (i.isLast === false) {
                socketRef.current?.send(JSON.stringify({ message: 'next-instruction' }))
            } else {
                emitter.emit('tutor-done')
            }
        })

        // emitters to track state

        emitter.on('tutor-done', () => {
            console.log('tutor-done')
            context.setState('client')
            socketRef.current?.send(JSON.stringify({ message: 'tutor-done' }))
        })

        emitter.on('client-done', () => {
            console.log('client is done, giving control to server')
            console.log('client-done')
            context.setState('tutor')
            socketRef.current?.send(JSON.stringify({ message: 'client-done' }))
        })
        return () => {
            socketRef.current?.close()
        }
    }, [])

    return <></>
}

export default Websocket
