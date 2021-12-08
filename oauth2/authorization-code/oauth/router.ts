import * as Router from 'koa-router'
import { BaseContext } from 'koa'
import * as uuid from 'uuid/v4'

import { IUser } from './models/user'
import { IClient } from './models/client'
import userService from './services/user'
import clientService from './services/client'

import * as adapters from './adapters'
import constants from './config/constants'
import { encrypt } from './utils/util'

const router = new Router()

// router.use(['/users'], authenticate())
router.get('/login', async (ctx: BaseContext, next: () => void) => {
    await ctx.render('login-server.ejs', { auth: 'Basic ' + Buffer.from(`${constants.clientId}:${constants.clientSecret}`).toString('base64') })
})

router.post('/login', async (ctx: BaseContext, next: () => void) => {
    try {
        const token = await adapters.token()(ctx)
        if (!token) {
            throw new Error('token no found')
        } else {
            ctx.body = token
        }
    } catch(err) {
        console.log(err)
        ctx.body = {
            code: err.status,
            message: err.message
        }
    }
})

router.get('/authorize', async (ctx: BaseContext): Promise<void> => {
    const param = { _id: ctx.query.client_id }
    const result: IClient = (await clientService.findOne(param)).toObject()
    await ctx.render('login.ejs', { auth: 'Basic ' + Buffer.from(`${result.id}:${result.clientSecret}`).toString('base64') })
})

router.post('/authorize', async (ctx: BaseContext, next: () => void): Promise<void> => {
    try {
        const code = await adapters.authorize()(ctx)
        if (!code) {
            throw new Error('token no found')
        } else {
            ctx.body = code
        }
    } catch (err) {
        console.log(err)
        ctx.body = {
            code: err.status,
            message: err.message
        }
    }
})

router.post('/token', async (ctx: BaseContext): Promise<void> => {
    try {
        const token = await adapters.token()(ctx)
        if (!token) {
            throw new Error('token no found')
        } else {
            ctx.body = token
        }
    } catch (err) {
        console.log(err)
        ctx.body = {
            code: err.status,
            message: err.message
        }
    }
})

router.post('/users', async (ctx: BaseContext): Promise<void> => {
    console.log(ctx.request.body)
    const item: IUser = ctx.request.body as IUser
    item.password = encrypt(item.password)
    console.log(item)
    ctx.body = await userService.create(item)
})

router.get('/users', async (ctx: BaseContext): Promise<void> => {
    const users: IUser[] = await userService.find()
    ctx.body = users
})

router.post('/clients', async (ctx: BaseContext): Promise<void> => {
    console.log(ctx.request.body)
    const item: IClient = ctx.request.body as IClient
    item.clientSecret = uuid()
    console.log(item)
    ctx.body = await clientService.create(item)
})

router.get('/clients', async (ctx: BaseContext): Promise<void> => {
    const clients: IClient[] = await clientService.find()
    ctx.body = clients
})

export default router