const bcrypt = require("bcryptjs")

const generateToken = require("../../utils/generateToken")
const hashPassword = require("../../utils/hashPassword")
const getUserId = require("../../utils/getUserId")

const auth = {
  createUser: async (parent, { data }, { UserModel }) => {
    // It'll be verified if the password is longer
    // than 8 characters and if the email exists.
    const userExists = await UserModel.findOne({ email: data.email })

    if (userExists) throw new Error(`Já existe um usuário com o e-mail ${data.email}.`)

    const password = await hashPassword(data.password)

    const user = await UserModel.create({ ...data, password })

    return {
      token: generateToken(user._id),
      user
    }
  },

  loginUser: async (parent, { data }, { UserModel }) => {
    const user = await UserModel.findOne({ email: data.email })

    if (!user) throw new Error(`Nenhum usuário com o e-mail ${data.email}.`)

    const passwordValid = await bcrypt.compare(data.password, user.password)

    if (!passwordValid) throw new Error("Senha inválida.")

    return {
      token: generateToken(user._id),
      user
    }
  },

  updateUser: async (parent, args, { UserModel, request }) => {
    // Will update user, including user password
    // by re-hashing it. User authenticated has to
    // own the user that he's updating.
    const changesObject = {
      name: args.data.name,
      email: args.data.email
    }

    const userId = getUserId(request)

    const isOwner = args.id === userId

    if (typeof args.data.password === "string") {
      changesObject.password = await hashPassword(args.data.password)
    }

    if (!userId || !isOwner) throw new Error("Você não pode efetuar essa mudança.")

    const user = await UserModel.findOneAndUpdate({ _id: args.id }, changesObject, {
      new: true
    })

    return user
  },

  deleteUser: async (parent, { id }, { UserModel, request }) => {
    // Delete the user, verifying if it exists.

    const userId = getUserId(request)

    const exists = await UserModel.findById(userId)
    const isOwner = id === userId

    if (!userId) throw new Error("Você precisa estar autenticado.")
    if (!isOwner) throw new Error("Você não pode deletar essa conta.")
    if (!exists) throw new Error("Usuário com o ID informado não existe.")

    const user = await UserModel.findOneAndDelete({ _id: userId })

    return user
  }
}

module.exports = auth
