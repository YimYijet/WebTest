import * as Router from 'koa-router'
import * as OAuth2Server from 'oauth2-server'
import { Context } from 'koa'

import { IUser } from './models/user'
import { create } from './services/user'
const router = new Router()

router.get('/authorize', async (ctx: Context): Promise<void> => {
    const query = ctx.query
    ctx.redirect(`${query.redirect_uri}?code=SplxlOBeZQQYbYS6WxSbIA&state=${query.state}`)
})

router.get('/token', async (ctx: Context): Promise<void> => {
    const query = ctx.query
    ctx.body = query
})

router.post('/users', async (ctx: Context): Promise<void> => {
    console.log(ctx.request.body)
    const item = ctx.request.body as IUser
    console.log(item)
    ctx.body = await create(item)
})
export default router