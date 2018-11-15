import * as Koa from 'koa'
import * as WebSocket from 'ws'

const app = new Koa()

const wss = new WebSocket.Server({
    port: 3000
})

wss.on('connection', (ws) => {
    console.log(`websocket server listening on port: 3000`)
    ws.on('message', (data) => {
        console.log(data)
        ws.send('gun')
    })
})


