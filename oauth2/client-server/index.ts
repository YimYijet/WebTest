import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import * as http from 'http'

import { connectDB } from './db'
import { IUser } from './models';
import UserService from './services'

const app = new Koa()

const router = new Router()

app.use(bodyParser())

router.post('/users', async (ctx: Koa.BaseContext) => {
    const item: IUser = ctx.request.body as IUser, 
    user: IUser = await UserService.create(item) as IUser
    ctx.body = user._id
})

connectDB().then(() => {
    app.use(router.routes())
    http.createServer(app.callback()).listen(9000, () => {
        console.log(`http server listening on port: 3000`)
    })
})
