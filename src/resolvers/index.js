const Query = require("./Query")
const userMutations = require("./mutations/user")

const resolvers = {
  Query,
  Mutation: { ...userMutations }
}

module.exports = resolvers
