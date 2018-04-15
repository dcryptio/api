const { makeExecutableSchema } = require('graphql-tools');
const Post = require('./models/post')

// Some fake data
const books = [
  { title: "Harry Potter and the Sorcerer's stone", author: 'J.K. Rowling' },
  { title: 'Jurassic Park', author: 'Michael Crichton', },
];

// The GraphQL schema in string form
const typeDefs = `
  type Query {
    # All books
    books: [Book],
    posts(ids: [String]): [Post],
  }
  type Mutation {
    createPost(
      keyName: String,
      data: String
    ): Post
  }
  type Book { title: String, author: String }
  type Post {
    id: String,
    keyName: String,
    data: String
  }
`;

// The resolvers
const resolvers = {
  Query: {
    books: () => books,
    posts: (root, { ids }, context) =>  ids && Post.find({ '_id': { $in: ids }}) || Post.find()
  },
  Mutation: {
    createPost: (root, { keyName, data }, context) => new Post({ keyName, data }).save()
  }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema
