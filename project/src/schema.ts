import { ApolloServer, gql } from 'apollo-server';
import colors from 'colors';

export const typeDefs = gql`
  type Query {
    hello: String!
  }
`;
