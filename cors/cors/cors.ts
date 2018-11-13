import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as serve from 'koa-static'
import * as cors from 'kcors'
import * as http from 'http'
import * as path from 'path'

const app = new Koa()

const router = new Router()

router.get('/data', (ctx: Koa.Context) => {
    ctx.set('my-header', 'hello')
    ctx.body = {
        content: {},
        code: 200
    }
})
router.put('/data', (ctx: Koa.Context) => {
    ctx.set('my-header', 'hello')
    ctx.body = {
        content: {},
        code: 200
    }
})

app.use(cors({
    origin: (ctx: Koa.Context) => {
        const whiteList = ['http://localhost:3000']
        if (whiteList.includes(ctx.header.origin)) {
            return ctx.header.origin
        }
        return ''
    },
    exposeHeaders: 'my-header',
    allowMethods: 'PUT',
    allowHeaders: 'req-header',
    maxAge: 6,
    credentials: true    
}))

// app.use((ctx: Koa.Context, next: () => void) => {
//     const whiteList = ['http://localhost:3000']
//     if (whiteList.includes(ctx.header.origin)) {
//         // 来源
//         ctx.set('Access-Control-Allow-Origin', ctx.header.origin)
//         // 前端安全header
//         ctx.set('Access-Control-Expose-Headers', 'my-header')
//         // 允许cookie
//         ctx.set('Access-Control-Allow-Credentials', 'true')
//         // 检测时长
//         ctx.set('Access-Control-Max-Age', '6')
//         // 允许请求头
//         ctx.set('Access-Control-Allow-Headers', 'req-header')
//         // 允许方法
//         ctx.set('Access-Control-Allow-Methods', 'PUT')
//     }
//     if (ctx.method == 'OPTIONS') { 
//         ctx.response.status = 200
//     } else {
//         return next()
//     }
// })

app.use(serve(path.join(__dirname, '')))

app.use(router.routes())

http.createServer(app.callback()).listen(4000, () => {
    console.log(`http server listening on port: 4000`)
})