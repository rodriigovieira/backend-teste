const getUserId = require("../utils/getUserId")

const Query = {
  users: async (parent, args, { UserModel, request }) => {
    const userId = getUserId(request)

    if (!userId) throw new Error('Você precisa estar autenticado.')

    const users = await UserModel.find({})

    return users
  },

  me: async (parent, args, { UserModel, request }) => {
    const userId = getUserId(request)

    if (!userId) throw new Error('Você precisa estar autenticado.')

    const user = await UserModel.findById(userId)

    return user
  }
}

module.exports = Query
