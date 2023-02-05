import { gql } from "@apollo/client";

export const MUTATION_LOGIN = gql`
  mutation Login($password: String!, $username: String!) {
    login(password: $password, username: $username) {
      token
    }
  }
`;

export const QUERY_GET_CURRENT_USER = gql`
  query FindByToken {
    findByToken {
      _id
      username
    }
  }
`;
