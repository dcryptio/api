const { makeExecutableSchema } = require('graphql-tools')
const Post = require('./models/post')
const Image = require('./models/image')

const typeDefs = `
  type Query {
    # All encrypted posts. Can filter by id
    posts(ids: [String]): [Post],
    # All encrypted images. Can filter by id
    images(ids: [String]): [Image],
  }
  type Mutation {
    # Create a new post
    createPost(
      # The user keyName identifier
      keyName: String!,
      # The encrypted post
      data: String!
    ): Post
    # Create a new image
    createImage(
      # The user keyName identifier
      keyName: String!,
      # The encrypted image
      data: String!
    ): Image
  }
  # An encrypted post
  type Post {
    # The encrypted post's identifier
    id: String,
    # The user keyName identifier
    keyName: String,
    # The encrypted post
    data: String
  }
  # An encrypted image
  type Image {
    # The encrypted image's identifier
    id: String,
    # The user keyName identifier
    keyName: String,
    # The encrypted image
    data: String
  }
`;

// The resolvers
const resolvers = {
  Query: {
    posts: (root, { ids }, context) =>  ids && Post.find({ '_id': { $in: ids }}) || Post.find(),
    images: (root, { ids }, context) =>  ids && Image.find({ '_id': { $in: ids }}) || Image.find(),
  },
  Mutation: {
    createPost: (root, { keyName, data }, context) => new Post({ keyName, data }).save(),
    createImage: (root, { keyName, data }, context) => new Image({ keyName, data }).save(),
  },
};

// Put together a schema
const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = executableSchema
