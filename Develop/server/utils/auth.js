const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// set token secret and expiration date
const secret = process.env.AUTH_SECRET;
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    console.log("This is the req: ", req);
    // allows token to be sent via  req.body, req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    console.log("This is the token: ", token);
    if (req.headers.authorization != null) {
      token = token.split(' ').pop().trim();
    }
    console.log("This is the token after split: ", token);


    if (!token) {
      return req;
    }

    // console.log("This is: ", req.headers.authorization)
    // console.log(token);

    
    // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      // throw new Error('invalid token');
    }

    // console.log("This is the req: ")
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    console.log("This is the token: ", token);
    return token;
  },
};
