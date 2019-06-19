const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    me: User!
  }

  type Mutation {
    createUser(data: CreateUserInput!): AuthPayload!
    updateUser(id: ID!, data: UpdateUserInput!): User!
    deleteUser(id: ID!): User!

    loginUser(data: LoginUserInput!): AuthPayload!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`

module.exports = typeDefs
