import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { connect } from "./db";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const createConnection = async () => {
  const connection = await connect();
  return connection;
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    const db = await createConnection();
    return { db };
  },
});

const startServer = async () => {
  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  const port = process.env.PORT || 5000;

  app.listen({ port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    )
  );
};

startServer();
