const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const script = [
    {
        interaction: 'point',
        payload: {
            elementId: 'main-text',
        },
    },
    {
        interaction: 'point',
        payload: {
            elementId: 'main-text',
        },
    },
]

const index = 0

function connect() {
    wss.on('connection', (ws) => {
        console.log('Client connected')

        ws.on('message', (message) => {
            console.log(`Server received: ${message}`)
            if (message.toString() === 'client-done') {
                console.log('sending next instruction to client: ', script[index])
                ws.send(JSON.stringify(script[index]))
            }
        })
        ws.on('close', () => {
            console.log('Client disconnected, attempting to reconnnect in 1 second') // add better reconnection method
            setTimeout(function () {
                connect()
            }, 1000)
        })
    })
}

connect()

server.listen(8080, () => {
    console.log('Server started on port 8080')
})
