const {ApolloServer, gql} = require('apollo-server')
const colors = require('colors');
const {db} = require('./data');
const { Category } = require('./resolvers/Category');
const { Mutation } = require('./resolvers/Mutation');
const { Product } = require('./resolvers/Product');
const { Query } = require('./resolvers/Query');
const { typeDefs } = require('./schema');






const server = new ApolloServer({
  typeDefs,
  resolvers : {
    Query,
    Mutation,
    Category,
    Product,
  }, 
  context: {
    db
  }
})


server.listen().then(({url}) => {
  console.log(`Server is ready at port${url}`.cyan.inverse)
})