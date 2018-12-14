import * as Router from 'koa-router'
import * as OAuth2Server from 'oauth2-server'
import { Context } from 'koa';

const router = new Router()

router.get('/authorize', async (ctx: Context): Promise<void> => {
    
})

router.get('/token', async (ctx: Context): Promise<void> => {
    
})

export default router