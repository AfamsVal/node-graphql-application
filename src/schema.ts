import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getUser(username: String!): User
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload
  }
`;

export { typeDefs };
