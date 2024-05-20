import { gpl } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      email
      password
      username
      savedBooks {
        bookId
        description
        image
        link
        title
        authors
      }
    }
  }
`;