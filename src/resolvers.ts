import { query } from "./db";
import { IResolvers } from "@graphql-tools/utils";

const resolvers: IResolvers = {
  Query: {
    async getUser(_, { username }, { db }) {
      //   const result = await query(
      //     db,
      //     "SELECT * FROM users WHERE username = ? LIMIT 1",
      //     [username]
      //   );
      //   return result.length ? result[0] : null;
      return "val";
    },
  },

  Mutation: {
    async login(_, args, { db }) {
      //   const result = await query(
      //     db,
      //     "SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1",
      //     [args.username, args.password]
      //   );
      //   return result.length ? result[0] : null;
      return "Vallooo";
    },
  },
};

export { resolvers };
