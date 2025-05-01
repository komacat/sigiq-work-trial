'use client'

import { useEffect } from 'react'
import emitter from '@/utils/emitter'

export const Websocket = () => {
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080')
        socket.onmessage = (event) => {
            console.log('event: ', event.data)
            const data = JSON.parse(event.data)
            if (data.interaction === 'point') {
                emitter.emit('point', data)
            }
        }

        emitter.on('tutor-done', () => {
            socket.send('tutor-done')
        })

        emitter.on('client-done', () => {
            console.log('client is done, giving control to server')
            socket.send('client-done')
        })

        return () => {
            socket.close()
        }
    }, [])
    return <></>
}
export default Websocket
