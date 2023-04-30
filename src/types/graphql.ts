import { IResolvers } from "@graphql-tools/utils";

export interface QueryResolvers extends IResolvers {
  hello: () => any;
}
