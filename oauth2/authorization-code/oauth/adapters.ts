import * as OAuth2Server from 'oauth2-server'
import { Context } from 'koa'
import oauth from './oauthModel'

type AuthenticateOpt = {
    scope?: string | string[]
}

type AuthorizeOpt = {
}

type TokenOpt = {
}

export function authenticate(opt: AuthenticateOpt = {}): Function {
    return async function (ctx: Context, next: () => void) {
        console.log('authenticate')
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

export function authorize(opt: AuthorizeOpt = {}): Function {
    return async function (ctx: Context, next: () => void) {
        console.log('authorize')
        const request = new OAuth2Server.Request(ctx.req),
        response = new OAuth2Server.Response(ctx.response)
        oauth.authorize(request, response, opt).then((token) => {
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