const Koa = require('koa')
const cors = require('koa-cors')
const logger = require('koa-logger')
const koaRouter = require('koa-router')
const koaBody = require('koa-bodyparser')
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa')
const schema = require('./graphql')
const mongo = require('./db')


const PORT = process.env.PORT || 3000
const app = new Koa()
app.context.db = mongo.start()
const router = new koaRouter()

const graphql = graphqlKoa({
  schema,
  // tracing: true,
  // cacheControl: true
})

app.use(koaBody())
router.post('/graphql', graphql)
router.get('/graphql', graphql)
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))

app.use(logger('dev'))
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(PORT, err => {
  if (err) return console.error('Failed', err)
  console.log(`Listening on port ${PORT}`)
})

module.exports = app
