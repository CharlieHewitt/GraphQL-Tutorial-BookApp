// imports
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

// initialisation
const app = express();

// middleware to handle GraphQL requests, at /graphql endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema
  })
);

// port number + callback for log
app.listen(4000, () => {
  console.log('listening on port 4000 ...');
});
