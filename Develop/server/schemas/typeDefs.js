const typeDefs = `

type User {
  _id: ID
  username: String!
  email: String!
  password: String!
  savedBooks: [Book]!
}

type Auth {
  token: ID!
  user: User
}

type Book {
  description: String!
  bookId: String!
  image: String
  link: String
  title: String!
  authors: [String]
}

input BookInput {
  authors: [String]
  description: String!
  bookId: String!
  image: String
  link: String
  title: String!
}

type Query {
  me: User
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveBook(bookData: BookInput!, ): User
  removeBook(bookId: ID!): User
}

`;

module.exports = typeDefs;