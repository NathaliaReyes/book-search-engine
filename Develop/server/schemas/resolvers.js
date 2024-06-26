// const { getSingleUser } = require('../controllers/user-controller');
const { User } = require('../models');

// import sign token and AuthenticationError function from auth
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // if (context.user) {
        return User.findOne({ _id: context.user._id });
      // }
      // throw AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },
    
    saveBook: async (parent, { bookData }, context) => {
      console.log(bookData);
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parent, { bookId }, context) => {
      if(context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id, 'savedBooks.bookId': bookId },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        if (!updatedUser) {
          throw new Error('No book with this id found');
        }
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;