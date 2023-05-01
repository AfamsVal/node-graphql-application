import { User } from "./user.model";
import { UserService } from "./user.service";
import { IResolvers } from "@graphql-tools/utils";

const resolvers: IResolvers = {
  Query: {
    async getUser(_, { id }, { db }) {
      const userService = new UserService(db);
      const user = await userService.getUserById(id);
      return user;
    },
    async getUsers(_, __, { db }) {
      const userService = new UserService(db);
      const users = await userService.getUsers();
      return users;
    },
  },
  Mutation: {
    async createUser(_, { name, email, password }, { db }) {
      const userService = new UserService(db);
      const user = await userService.createUser(name, email, password);
      return user;
    },
    async updateUser(_, { id, name, email }, { db }) {
      const userService = new UserService(db);
      const user = await userService.updateUser(id, name, email);
      return user;
    },
    async deleteUser(_, { id }, { db }) {
      const userService = new UserService(db);
      const deletedUser = await userService.deleteUser(id);
      return deletedUser;
    },
  },
  User: {
    async posts(user: User, _, { db }) {
      const userService = new UserService(db);
      const posts = await userService.getUsers();
      return posts;
    },
  },
};

export default resolvers;
