const { ApolloServer, gql } = require('apollo-server');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
dotenv.config();

const { DB_URI, DB_NAME } = process.env;

const typeDefs = gql`
  type Query {
    myTaskLists: [TaskList!]!
  }

  type Mutation {
    signUp(input: SignUpInput): AuthUser!
    signIn(input: SignInInput): AuthUser!
  }

  input SignUpInput {
    email: String!
    password: String!
    name: String!
    avatar: String
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type AuthUser {
    user: User!
    token: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    avatar: String
  }

  type TaskList {
    id: ID!
    createdAt: String!
    title: String!
    progress: Float!
    users: [User!]!
    todos: [ToDo!]!
  }

  type ToDo {
    id: ID!
    content: String
    isCompleted: Boolean!
    taskList: TaskList
  }
`;

const resolvers = {
  Query: {
    myTaskLists: () => [],
  },

  Mutation: {
    signUp: async (_, { input }, { db }) => {
      // Password encryption
      const hashedPassword = bcrypt.hashSync(input.password);
      const user = {
        ...input,
        password: hashedPassword,
      };
      const result = await db
        .collection('Users')
        .findOne({ email: input.email });
      // Check if user already exists
      if (!result) {
        // Add user to the database
        db.collection('Users').insertOne(user);
        return {
          user,
          token: 'token',
        };
      } else {
        throw new Error('User already exists');
      }
    },
    signIn: async (_, { input }, { db }) => {
      const user = await db.collection('Users').findOne({ email: input.email });
      // Check if user exists and entered password is correct
      if (!user || !bcrypt.compareSync(input.password, user.password)) {
        throw new Error('Invalid email or password.');
      }
      return {
        user,
        token: 'token',
      };
    },
  },

  User: {
    // _id for MongoDB, id for any other dbms
    id: ({ _id, id }) => _id || id,
  },
};

const start = async () => {
  const client = new MongoClient(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db(DB_NAME);

  const context = {
    db,
  };

  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({ typeDefs, resolvers, context });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

start();
