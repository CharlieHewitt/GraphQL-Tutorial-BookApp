// imports
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

// initialisation
const app = express();

// deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

// connect to mongoDb
mongoose.connect(
  'mongodb+srv://gql-app:gql-test-123@book-author-database-0memv.mongodb.net/test?retryWrites=true&w=majority'
);
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

// middleware to handle GraphQL requests, at /graphql endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true //  for testing
  })
);

// port number + callback for log
app.listen(4000, () => {
  console.log('listening on port 4000 ...');
});
