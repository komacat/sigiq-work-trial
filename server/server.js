const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

let script = require('./script')
script = Object.values(script)[0] // turns into an object when imported :|


function connect() {
    wss.on('connection', (ws) => {
        let index = 0
        console.log(index)
        console.log(script)

        ws.on('message', (event) => {
            const data = JSON.parse(event)
            console.log(`Server received: ${data.message}`)
            console.log((data.message === 'next-instruction' || data.message === 'client-done') &&
            index < script.length)
            console.log(script)
            console.log(script.length)
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
