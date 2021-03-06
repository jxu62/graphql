import express from "express";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import bodyParser from "body-parser";
const cors = require("cors");
import schema from "./data/schema";
import getAccess from "./data/getToken";
const GRAPHQL_PORT = 3001;

const graphQLServer = express();

//const a = getAccess.getAccessTok();
graphQLServer.use(cors());
graphQLServer.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
graphQLServer.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
//console.log( `!!!${a}!!!`)

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);
