import * as Koa from 'koa'
// import * as http from 'http'
// import * as ws from 'socket.io'
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
// const server = http.createServer(app.callback())

// const io = ws(server)

// io.on('connect', (client) => {
//     client.on('event', (data) => {
//         console.log(data)
//         client.emit('request', 'hello')
//     })
// })

// server.listen(3000, () => {
//     console.log(`http server listening on port: 3000`)
// })

