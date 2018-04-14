const koa = require('koa');
const koaRouter = require('koa-router');
const koaBody = require('koa-bodyparser');
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');
const { makeExecutableSchema } = require('graphql-tools');

const app = new koa();
const router = new koaRouter();
const PORT = 3000;

// Some fake data
const books = [
  { title: "Harry Potter and the Sorcerer's stone", author: 'J.K. Rowling' },
  { title: 'Jurassic Park', author: 'Michael Crichton', },
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;

// The resolvers
const resolvers = {
  Query: { books: () => books },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// koaBody is needed just for POST.
router.post('/graphql', koaBody(), graphqlKoa({ schema }));
router.get('/graphql', graphqlKoa({ schema }));

router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);

module.exports = app
