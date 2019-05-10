import * as Router from 'koa-router'
import { Request, Response } from 'oauth2-server'
import { BaseContext } from 'koa'
import * as OAuth2Server from 'oauth2-server'

import { IUser } from './models/user'
import { IClient } from './models/client'
import userService from './services/user'
import clientService from './services/client'

import { authenticate, authorize } from './adapters'
import oauth from './oauthModel'
import { encrypt } from './utils/util'

const router = new Router()

// router.use(['/users'], authenticate())
router.post('/login', async (ctx: BaseContext, next: () => void) => {
    try {
        const request = new OAuth2Server.Request(ctx.request),
        response = new OAuth2Server.Response(ctx.response)
        const token = await oauth.token(request, response, {})
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
    await ctx.render('login.html')
    // try {
    //     const query = ctx.query, req = new Request(ctx.request), res = new Response(ctx.response)
    //     const code = await oauth.authorize(req, res)
    //     ctx.redirect(`${query.redirect_uri}?code=${code}state=${query.state}`)
    // } catch (err) {
    //     console.log(err)
    // }
})

router.post('/authorize', async (ctx: BaseContext): Promise<void> => {
    try {
        console.log('authorize')
        const request = new OAuth2Server.Request(ctx.request),
        response = new OAuth2Server.Response(ctx.response)
        oauth.authorize(request, response, {}).then((token) => {
            console.log(token)
        }).catch((err) => {
            console.log(err)
            ctx.body = {
                code: err.status,
                message: err.message
            }
        })
        ctx.body = 'fuck'
    } catch (err) {
        console.log(err)
    }
})

router.get('/token', async (ctx: BaseContext): Promise<void> => {
    const query = ctx.query
    ctx.body = query
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
    item.clientSecret = encrypt(item.clientSecret)
    console.log(item)
    ctx.body = await clientService.create(item)
})

router.get('/clients', async (ctx: BaseContext): Promise<void> => {
    const clients: IClient[] = await clientService.find()
    ctx.body = clients
})

export default router