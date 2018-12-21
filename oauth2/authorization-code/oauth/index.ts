import * as Koa from 'koa'
import * as views from 'koa-views'
import * as bodyParser from 'koa-bodyparser'
import * as http from 'http'
import * as path from 'path'

import router from './router'

import { config } from './db'
import waterline from './models'

const app = new Koa()

app.use(views(path.join(__dirname, '')))

app.use(bodyParser())

app.use(router.routes())

waterline.initialize(config, (err: any, models: any) => {
    if (err) {
        console.log('waterline initialize failed, err:', err)
        return
    }
    waterline.models = models.collections
    http.createServer(app.callback()).listen(4000, () => {
        console.log(`http server listening on port: 4000`)
    })
})