const typeDefs = `
type User {
  _id: ID!
  username: String!
  email: String!
  password: String!
  bookCount: Int!
  savedBooks: [Book]
}

input BookInput {
  authors: [String]
  description: String!
  bookId: String!
  image: String
  title: String!
  link: String
}

type Book {
  bookId: ID!
  authors: [String]
  description: String!
  image: String
  link: String
  title: String!
}

type Auth {
  token: ID!
  user: User
}

type Query {
  me: User
  searchBooks(query: String!): [Book]
}


type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  saveBook(bookData: BookInput!): User
  removeBook(bookId: ID!): User
}
`;

module.exports = typeDefs;