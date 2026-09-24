const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

const schema = buildSchema(`
  type Query {
    hello: String
    message: String
  }
`);

const root = {
  hello: () => "Hello GraphQL!",
  message: () => "GraphQL API is working"
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000/graphql");
});