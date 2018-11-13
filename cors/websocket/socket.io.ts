import * as Koa from 'koa'
import * as http from 'http'
import * as ws from 'socket.io'

const app = new Koa()

const server = http.createServer(app.callback())

const io = ws(server)

io.on('connect', (client) => {
    client.on('hello', (data) => {
        console.log(data)
        client.emit('gun', 'gun')
    })
})

server.listen(3000, () => {
    console.log(`http server listening on port: 3000`)
})
