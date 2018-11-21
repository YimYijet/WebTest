import * as request from 'superagent'
import * as cheerio from 'cheerio'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as http from 'http'

const app = new Koa()

const router = new Router()

function getData(): Promise<any> {
    return new Promise((resolve, reject) => {
        request.get('https://store.steampowered.com/stats/').end((err, res) => {
            if (err) {
                reject(err)
            }
            const $ = cheerio.load(res.text), temp: object[] = []
            $('#detailStats tbody tr').each((index, item) => {
                temp.push({
                    cur: $(item).find('td:first-child').text().trim(),
                    peak: $(item).find('td:nth-child(2)').text().trim(),
                    name: $(item).find('td:last-child').text().trim(),
                })
            })
            resolve(temp)
        })
    })
}

router.get('/', async (ctx: Koa.Context, next: () => void) => {
    ctx.body = await getData()
})

app.use(router.routes())

http.createServer(app.callback()).listen(3344, () => {
    console.log(`http server listening on port: 3344`)
})
