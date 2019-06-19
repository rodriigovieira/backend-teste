const bcrypt = require("bcryptjs")

// Validate and then hash the pvoided plain text
// password, and then the hashed version is returned.

const hashPassword = (plainTextPassword) => {
  if (plainTextPassword.length < 8) throw new Error("A senha precisa ter ao menos 8 caracteres.")

  return bcrypt.hash(plainTextPassword, 10)
}

module.exports = hashPassword
