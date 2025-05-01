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
            elementId: 'secondary-text',
        },
    },
]

function connect() {
    wss.on('connection', (ws) => {
        let index = 0
        console.log(index)
        console.log('Client connected')

        ws.on('message', (message) => {
            console.log(`Server received: ${message}`)
            if ((message.toString() === 'client-done' || message.toString() === 'client-connected') && index < script.length) {
                console.log('sending next instruction to client: ', script[index])
                ws.send(JSON.stringify(script[index]))
                index += 1
            } else {
                console.log("script has completed")
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
