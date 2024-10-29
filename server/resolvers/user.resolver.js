import { users } from "../db/dummy.db.js";

const userResolver = {
    Query: {
        users: () => users,
        user: (_, { userId }) => users.find(({ _id }) => _id === userId)
    },
    Mutation: {},
}

export default userResolver;