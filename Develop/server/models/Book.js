const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const bookSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  // saved book id from GoogleBooks
  bookId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  authors: [
    {
      type: String,
    },
  ],
});


module.exports = bookSchema;
