import { gql } from "@apollo/client";

export const MUTATION_LOGIN = gql`
  mutation Login($password: String!, $username: String!) {
    login(password: $password, username: $username) {
      token
    }
  }
`;
