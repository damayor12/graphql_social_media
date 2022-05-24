const {ApolloServer, gql} = require('apollo-server')
const colors = require('colors');
const {products, categories, reviews} = require('./data');
const { typeDefs } = require('./schema');




const resolvers = {
  Query: {
    hello: (parent, args, context) => {
      return ['World'];
    },
    products: (parent, args, context) => {
      return products;
    },
    product: (parent, args, context) => {
      const productId = args.id;

      const product = products.find((prod) => prod.id === productId);
      return product ? product : null;
    },
    categories: (parent, args, context) => {
      return categories;
    },
    category: (parent, args, context) => {
      const { id } = args;

      const category = categories.find((cat) => cat.id === id);
      return category ? category : null;
    },
  },
  Category: {
    products: (parent, args, context) => {
      const categoryId = parent.id;
      return products.filter((product) => product.categoryId === categoryId);
    },
  },
  Product: {
    category: (parent, args, context) => {
      const categoryId = parent.categoryId
      return categories.find((category) => category.id === categoryId);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers
})


server.listen().then(({url}) => {
  console.log(`Server is ready at port${url}`.cyan.inverse)
})