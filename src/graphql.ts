const { makeExecutableSchema } = require('graphql-tools');
const Post = require('./models/post')

const typeDefs = `
  type Query {
    # All encrypted posts. Can filter by id
    posts(ids: [String]): [Post],
  }
  type Mutation {
    # Create a new post
    createPost(
      # The user keyName identifier
      keyName: String!,
      # The encrypted data
      data: String!
    ): Post
  }
  # An encrypted post
  type Post {
    # The encrypted data identifier
    id: String,
    # The user keyName identifier
    keyName: String,
    # The encrypted data
    data: String
  }
`;

// The resolvers
const resolvers = {
  Query: {
    posts: (root, { ids }, context) =>  ids && Post.find({ '_id': { $in: ids }}) || Post.find()
  },
  Mutation: {
    createPost: (root, { keyName, data }, context) => new Post({ keyName, data }).save()
  }
};

// Put together a schema
const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = executableSchema
