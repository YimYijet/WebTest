import * as Router from 'koa-router'
import { Context } from 'koa'

import { AuthorizeParam, TokenParam } from './types'

const router = new Router()

function redirect(ctx: Context, url: string, params: any): void {
    const str: string[] = []
    for (let item in params) {
        str.push(`${item}=${item === 'redirect_uri' ? encodeURIComponent(params[item]): params[item]}`)
    }
    ctx.redirect(`${url}?${str.join('&')}`)
}

router.get('/', async (ctx: Context): Promise<void> => {
    await ctx.render('client.ejs', {
        text: 'not login'
    })
})

router.get('/login', async (ctx: Context): Promise<void> => {
    const params: AuthorizeParam = {
        response_type: 'code',
        client_id: 'client3000',
        state: 'hello',
        redirect_uri: 'http://localhost:3000/oauth/redirect',
        scope: 'user,data'
    }, url: string = 'http://localhost:4000/authorize'
    redirect(ctx, url, params)
})

router.get('/oauth/redirect', async (ctx: Context): Promise<void> => {
    const query = ctx.query,
    params: TokenParam = {
        response_type: 'authorization_code',
        client_id: 'client3000',
        redirect_uri: 'http://localhost:3000/oauth/redirect',
        code: query.code
    }, url: string = 'http://localhost:4000/token'
    redirect(ctx, url, params)
})

router.get('/data', async (ctx: Context): Promise<void> => {
    ctx.body = 'gun'
})

export default router