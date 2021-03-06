const Koa = require('koa')
const cors = require('koa-cors')
const logger = require('koa-logger')
const koaRouter = require('koa-router')
const koaBody = require('koa-bodyparser')
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa')
const { PORT } = require('./constants')
const schema = require('./graphql')
const mongo = require('./db')

const app = new Koa()
app.context.db = mongo.start()
const router = new koaRouter()

const graphql = graphqlKoa({
  schema,
  // tracing: true,
  // cacheControl: true
})

app.use(koaBody())
app.use(logger('dev'))

router.post('/graphql', (ctx, next) => {
  console.log(ctx.request.body)
  return graphql(ctx, next)
})
router.get('/graphql', graphql)
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(PORT, err => {
  if (err) return console.error('Failed', err)
  console.log(`Listening on port ${PORT}`)
})

module.exports = app
