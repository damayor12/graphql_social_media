const { ApolloServer, gql } = require('apollo-server');
const colors = require('colors');

const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type ManualGroup {
    id: ID!
    name: String!
    imageId: ID!
    bodyHtml: String
    memberships: [GroupMembership!]!
  }

  type AAutomaticGroup {
    id: ID!
    name: String!
    imageId: ID!
    bodyHtml: String!
    feature: [AutomaticGroupFeatures!]!
    applyFeaturesSeparately: Boolean!
    memberships: [GroupMembership!]!
  }

  type AutomaticGroupFeatures {
    column: String
  }

  type GroupMembership {
    groupId: ID!
    carId: ID!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      cars: () => [{ id: 1, color: 'blue', make: 'Toyota' }],
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`.cyan.inverse);
});
