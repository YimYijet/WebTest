import * as Koa from 'koa'
import * as serve from 'koa-static'
import * as http from 'http'
import * as path from 'path'

const app = new Koa()

app.use(serve(path.join(__dirname, '')))

http.createServer(app.callback()).listen(3000, () => {
    console.log(`http server listening on port: 3000`)
})