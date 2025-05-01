'use client'

import { useContext, useEffect } from 'react'
import emitter from '@/utils/emitter'
import { pointTo } from '@/utils/instructions'
import { Instruction } from '@/lib/types'
import { stateContext } from '@/context/stateContext'

export const Websocket = () => {
    const context = useContext(stateContext)
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080')
        socket.onmessage = (event) => {
            console.log('event: ', event.data)
            const data = JSON.parse(event.data)
            if (data.interaction === 'point') {
                emitter.emit('point', data)
            }
        }

        emitter.on('state', (data) => {
            console.log('Current <InteractableSlide> State:', data)
        })

        emitter.on('point', async (i: Instruction) => {
            await pointTo(i.payload.elementId) // emitter not waiting until tutor is done
            emitter.emit('tutor-done', null) 
        })

        emitter.on('tutor-done', () => {
            socket.send('tutor-done')
            context.setState("client")
        })

        emitter.on('client-done', () => {
            console.log('client is done, giving control to server')
            socket.send('client-done')
            context.setState("tutor")
        })

        return () => {
            emitter.off('tutor-done')
            emitter.off('client-done')
            emitter.off('state')
            socket.close()
        }
    }, [])
    return <></>
}
export default Websocket
