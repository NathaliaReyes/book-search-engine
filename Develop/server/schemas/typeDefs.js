const { gql } = require('apollo-server-express');

const typeDefs = gpl`
  type Book {
    _id: ID
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
    authors: [String]
  }

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

`