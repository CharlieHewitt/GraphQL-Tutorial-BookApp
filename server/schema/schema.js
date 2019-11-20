const graphql = require('graphql');

// grab { ... } from graphql
const { GraphQLObjectType, GraphQLString } = graphql;

// takes an object as param
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});
