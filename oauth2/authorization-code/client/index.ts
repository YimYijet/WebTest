import * as Koa from 'koa'
import * as views from 'koa-views'
import * as bodyParser from 'koa-bodyparser'
import * as http from 'http'
import * as path from 'path'

import router from './router'

const app = new Koa()

app.use(views(path.join(__dirname, ''), { extension: 'ejs'}))

app.use(bodyParser())

app.use(router.routes())

http.createServer(app.callback()).listen(3000, () => {
    console.log(`http server listening on port: 3000`)
})