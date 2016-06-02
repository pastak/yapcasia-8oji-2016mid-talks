const Koa = require('koa')
const koaStatic = require('koa-static')
const router = require('koa-router')()
const getTalks = require('./actions/talks').getTalks()
const getLts = require('./actions/talks').getLts()

const app = new Koa()

router
  .get('/talks', getTalks)
  .get('/lts', getLts)

app.use(koaStatic('statics'))
app.use(router.routes())

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log(`listen on localhost:${port}`)
})
