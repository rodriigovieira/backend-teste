const express = require("express")
const { ApolloServer } = require("apollo-server-express")
const mongoose = require("mongoose")

const typeDefs = require("./typedefs")
const resolvers = require("./resolvers")
const UserModel = require("./models/User")

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })

const port = process.env.PORT || 4000

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: ({ req: request }) => ({ request, UserModel })
})

server.applyMiddleware({ app })

// Redirecting GET requests on / to /graphql

app.get("/", (req, res) => {
  res.writeHead(301, { Location: "/graphql" })

  res.end()
})

app.listen(port, console.log("Server is up!"))
