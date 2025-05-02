const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const script = [
    {
        interaction: 'audio',
        payload: {
            chunk: 'hi',
            transcription: "This is an example transcription for the tutor's voice message",
        },
        isLast: true,
    },
    {
        interaction: 'point',
        payload: {
            elementId: 'circle',
        },
        isLast: true,
    },
    {
        interaction: 'point',
        payload: {
            elementId: 'main-question',
        },
        isLast: true,
    },
    {
        interaction: 'point',
        payload: {
            elementId: 'sub-question-1',
        },
        isLast: false,
    },
    {
        interaction: 'point',
        payload: {
            elementId: 'sub-question-2',
        },
        isLast: true,
    },
]

function connect() {
    wss.on('connection', (ws) => {
        let index = 0
        console.log('Client connected')

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
