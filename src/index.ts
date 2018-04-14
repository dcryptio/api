const Koa = require('koa')
const cors = require('koa-cors')
const logger = require('koa-logger')
const koaRouter = require('koa-router');
const koaBody = require('koa-bodyparser');
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');
const schema = require('./graphql')
const mongo = require('./db')

const app = new Koa()
app.context.db = mongo.start()
const router = new koaRouter();
const PORT = 3000;

// koaBody is needed just for POST.
router.post('/graphql', koaBody(), graphqlKoa({ schema }));
router.get('/graphql', graphqlKoa({ schema }));
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(logger('dev'))
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);

module.exports = app
