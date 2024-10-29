import { mergeResolvers } from "@graphql-tools/merge";

import userResolver from "./user.resolver.js";
import transactionResolver from "./transaction.resolver.js";

const combinedResolvers = mergeResolvers([userResolver, transactionResolver]);

export default combinedResolvers;
