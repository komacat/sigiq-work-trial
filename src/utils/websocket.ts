import { Interaction } from '@/lib/types'
import emitter from './emitter'
import { pointTo } from './instructions'

export function connect() {
    const ws = new WebSocket('ws://localhost:8080')
    ws.onopen = function () {
        ws.send(JSON.stringify({message: 'next-instruction'}))
    }

    ws.onmessage = (message) => {
        console.log('event: ', message.data)
        const data = JSON.parse(message.data)
        if (data.interaction === 'point') {
            emitter.emit('point', data)
        }
    }

    // emitters for main instructions

    emitter.on('point', async (event) => {
        const i = event as Interaction
        console.log(i)
        await pointTo(i.payload.elementId as string) // uhhh
        if (i.isLast === false) {
            ws.send(JSON.stringify({message: 'next-instruction'}))
        } else {
            emitter.emit('tutor-done')
        }
    })

    emitter.on('speech', (data) => {
        ws.send(JSON.stringify({message: 'client-response', data: data}))
    })

    // emitters to track state

    emitter.on('tutor-done', () => {
        console.log('tutor-done')
        ws.send(JSON.stringify({message: 'tutor-done'}))
    })

    emitter.on('client-done', () => {
        console.log('client is done, giving control to server')
        console.log('client-done')
        ws.send(JSON.stringify({message: 'client-done'}))
    })

    ws.onclose = function (e) {
        console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason)
        setTimeout(function () {
            connect()
        }, 1000)
    }

    ws.onerror = function (err: Event) {
        console.error('Socket encountered error: ', err, 'Closing socket')
        ws.close()
    }
}

export default connect
