import * as OAuth2Server from 'oauth2-server'
import { Context } from 'koa'
import oauth from './oauthModel'

type Opt = {
    scope?: string | string[]
}

export default function (opt: Opt = {}): any {
    return async function (ctx: Context, next: () => void, opt: Opt = {}) {
        console.log('en')
        const request = new OAuth2Server.Request({
            headers: {
                authorization: ctx.headers.authorization,
            },
            method: ctx.method,
            query: ctx.query,
            body: ctx.body
        }),
        response = new OAuth2Server.Response(ctx.response)
        oauth.authenticate(request, response, opt).then((token) => {
            console.log(token)
            return next()
        }).catch((err) => {
            console.log(err)
            ctx.body = {
                code: err.status,
                message: err.message
            }
        })
    }
}
