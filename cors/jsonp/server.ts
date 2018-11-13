import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as serve from 'koa-static'
import * as http from 'http'
import * as path from 'path'

const app = new Koa()

const router = new Router()

router.get('/data', (ctx: Koa.Context) => {
    const result = (<any>Object).assign({}, ctx.query)
    ctx.body = `${result['cb']}({
        code: 200,
        content: ${JSON.stringify(result)}
    })`
})

app.use(serve(path.join(__dirname, '')))

app.use(router.routes())

http.createServer(app.callback()).listen(3344, () => {
    console.log(`http server listening on port: 3344`)
})