import gql from "graphql-tag";

export const SIGNUP_MUTATION = gql`
  mutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signUp(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      id
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
    }
  }
`;

export const SIGNOUT_MUTATION = gql`
  mutation signOut {
    signOut
  }
`;
