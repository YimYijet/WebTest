import * as Router from 'koa-router'
import { BaseContext } from 'koa'
import * as request from 'request'

import constants from './config/constants'

const router = new Router()

function stringify(params: any) {
    const str: string[] = []
    for (let item in params) {
        str.push(`${item}=${item === 'redirect_uri' ? encodeURIComponent(params[item]): params[item]}`)
    }
    return str.join('&')
}

router.get('/', async (ctx: BaseContext): Promise<void> => {
    await ctx.render('login.html')
})

router.get('/login', async (ctx: BaseContext): Promise<void> => {
    // const params: AuthorizeParam = {
    //     response_type: 'code',
    //     client_id: '5c2d819adfca8f1744c30149',
    //     state: 'hello',
    //     redirect_uri: 'http://localhost:3000/oauth/redirect',
    //     scope: 'user,data'
    // }, url: string = 'http://localhost:4000/authorize'
    // redirect(ctx, url, params)
})

router.get('/oauth/redirect', async (ctx: BaseContext): Promise<void> => {
    const query = ctx.query,
    params = {
        client_id: constants.clientId,
        client_secrect: constants.clientSecret,
        redirect_uri: 'http://localhost:3000/oauth/redirect',
        state: '123',
    }, url: string = 'http://localhost:4000/token'
    
    const data = await request({
        url: `${url}?${stringify(params)}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${constants.clientId}:${constants.clientSecret}`).toString('base64'),
        },
        body: stringify({
            grant_type: 'authorization_code',
            code: query.code,
            scope: 'user'
        })
    })
    ctx.body = data
})

router.get('/data', async (ctx: BaseContext): Promise<void> => {
    ctx.body = 'gun'
})

export default router