import * as Router from 'koa-router'
import { BaseContext } from 'koa'

import { AuthorizeParam, TokenParam } from './types'

const router = new Router()

function redirect(ctx: BaseContext, url: string, params: any): void {
    const str: string[] = []
    for (let item in params) {
        str.push(`${item}=${item === 'redirect_uri' ? encodeURIComponent(params[item]): params[item]}`)
    }
    ctx.redirect(`${url}?${str.join('&')}`)
}

router.get('/', async (ctx: BaseContext): Promise<void> => {
    await ctx.render('login.html')
})

router.get('/login', async (ctx: BaseContext): Promise<void> => {
    const params: AuthorizeParam = {
        response_type: 'code',
        client_id: '5c2d819adfca8f1744c30149',
        state: 'hello',
        redirect_uri: 'http://localhost:3000/oauth/redirect',
        scope: 'user,data'
    }, url: string = 'http://localhost:4000/authorize'
    redirect(ctx, url, params)
})

router.get('/oauth/redirect', async (ctx: BaseContext): Promise<void> => {
    const query = ctx.query,
    params: TokenParam = {
        response_type: 'authorization_code',
        client_id: '5c2d819adfca8f1744c30149',
        redirect_uri: 'http://localhost:3000/oauth/redirect',
        code: query.code
    }, url: string = 'http://localhost:4000/token'
    redirect(ctx, url, params)
})

router.get('/data', async (ctx: BaseContext): Promise<void> => {
    ctx.body = 'gun'
})

export default router