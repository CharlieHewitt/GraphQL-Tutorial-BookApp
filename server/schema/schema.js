const graphql = require('graphql');

// grab { ... } from graphql
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// temporary data while not connected to db
let books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' }
];

// takes an object as param
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

/*
    Root Queries:

    A specific/ All books
    A specific/ All authors
*/

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db/ other source
      }
    }
  }
});

// export schema
module.exports = new GraphQLSchema({
  query: RootQuery
});
