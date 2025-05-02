import express from 'express'
import { createServer } from 'http'
import { WebSocketServer } from 'ws'

const app = express()
const server = createServer(app)
const wss = new WebSocketServer({ server })

import {scriptData} from './script.js'
const script = Object.values(scriptData)[0] // turns into an object when imported :|

function connect() {
    wss.on('connection', (ws) => {
        let index = 0

        ws.on('message', (event) => {
            const data = JSON.parse(event)
            console.log(`Server received: ${data.message}`)
            if (
                (data.message === 'next-instruction' || data.message === 'client-done') &&
                index < script.length
            ) {
                console.log('sending next instruction to client: ', script[index])
                ws.send(JSON.stringify(script[index]))
                index += 1
            } else if (data.message === 'tutor-done' && index >= script.length) {
                ws.send(JSON.stringify({ message: 'script-done' }))
            }
        })

        ws.on('close', () => {
            console.log('Client disconnected') // add better reconnection method
            ws.close()
        })
    })
}

connect()

server.listen(8080, () => {
    console.log('Server started on port 8080')
})
