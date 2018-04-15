const { makeExecutableSchema } = require('graphql-tools')
const { getFb, postFb } = require('./fetch')
const TextPost = require('./models/textPost')
const ImagePost = require('./models/imagePost')
const { generateKeyPair } = require('./generateKeyPair')

const typeDefs = `
  type Query {
    # All encrypted posts. Can filter by id
    posts(ids: [String]): [Post],
    # All encrypted images. Can filter by id
    images(ids: [String]): [Image],
    # Information about a facebook user
    user(id: String!): User
    # Obtain a random key
    keyPair: KeyPair
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
    id: ID,
    # The user keyName identifier
    keyName: String,
    # The encrypted post
    data: String
  }
  # An encrypted image
  type Image {
    # The encrypted image's identifier
    id: ID,
    # The user keyName identifier
    keyName: String,
    # The encrypted image
    data: String
  }
  # A facebook user info
  type User {
    # The user's name
    name: String
    # The user's id
    id: ID
  }
  # A KeyPair for encryption
  type KeyPair {
    private: String!
    public: String!
  }
`;

// The resolvers
const resolvers = {
  Query: {
    posts: (root, { ids }, context) =>  ids && TextPost.find({ '_id': { $in: ids }}) || TextPost.find(),
    images: (root, { ids }, context) =>  ids && ImagePost.find({ '_id': { $in: ids }}) || ImagePost.find(),
    user: async (root, { id }, context) => getFb(id),
    keyPair: async () => generateKeyPair()
  },
  Mutation: {
    createPost: (root, { keyName, data }, context) => new TextPost({ keyName, data }).save(),
    createImage: (root, { keyName, data }, context) => new ImagePost({ keyName, data }).save(),
  },
};

// Put together a schema
const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = executableSchema
