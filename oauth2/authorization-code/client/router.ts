import * as Router from 'koa-router'
import { Context } from 'koa'

import { Authorize } from './types'

const router = new Router()

router.get('/', async (ctx: Context): Promise<void> => {
    await ctx.render('client.ejs', {
        text: 'not login'
    })
})

router.get('/login', async (ctx: Context): Promise<void> => {
    const params: Authorize = {
        response_type: 'code',
        client_id: 'client3000',
        state: 'hello',
        redirect_uri: 'http://localhost:3000/oauth/redirect',
        scope: 'user,data'
    }, url: string = 'http://localhost:4000/authorize', str: string[] = []
    for (let item in params) {
        str.push(`${item}=${item === 'redirect_uri' ? encodeURIComponent(params[item]): params[item]}`)
    }
    ctx.redirect(`${url}?${str.join('&')}`)
})

router.get('/oauth/redirect', async (ctx: Context): Promise<void> => {
    const params = ctx.query
    ctx.body = params
})

router.get('/data', async (ctx: Context): Promise<void> => {
    ctx.body = 'gun'
})

export default router