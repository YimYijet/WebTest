import * as Router from 'koa-router'
import { Request, Response } from 'oauth2-server'
import { Context } from 'koa'

import { IUser } from './models/user'
import { IClient } from './models/client'
import userService from './services/user'
import clientService from './services/client'

import authenticate from './authenticate'
import oauth from './oauthModel'

const router = new Router()

// router.use(['/users'], authenticate())

router.get('/authorize', async (ctx: Context): Promise<void> => {
    try {
        const query = ctx.query, req = new Request(ctx.request), res = new Response(ctx.response)
        const code = await oauth.authorize(req, res)
        ctx.redirect(`${query.redirect_uri}?code=${code}state=${query.state}`)
    } catch (err) {
        console.log(err)
    }
})

router.get('/token', async (ctx: Context): Promise<void> => {
    const query = ctx.query
    ctx.body = query
})

router.post('/users', async (ctx: Context): Promise<void> => {
    console.log(ctx.request.body)
    const item: IUser = ctx.request.body as IUser
    console.log(item)
    ctx.body = await userService.create(item)
})

router.get('/users', async (ctx: Context): Promise<void> => {
    const users: IUser[] = await userService.find()
    ctx.body = users
})

router.post('/clients', async (ctx: Context): Promise<void> => {
    console.log(ctx.request.body)
    const item: IClient = ctx.request.body as IClient
    console.log(item)
    ctx.body = await clientService.create(item)
})

router.get('/clients', async (ctx: Context): Promise<void> => {
    const clients: IClient[] = await clientService.find()
    ctx.body = clients
})
export default router