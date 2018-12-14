import * as Koa from 'koa'
import * as http from 'http'

const app = new Koa()

http.createServer(app.callback).listen(3000, () => {
    console.log(`http server listening on port: 3000`)
})