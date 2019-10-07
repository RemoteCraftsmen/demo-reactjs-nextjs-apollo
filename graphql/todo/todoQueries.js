import gql from "graphql-tag";

export const GET_TODOS_QUERY = gql`
  query TodosQuery {
    userTodos {
      id
      description
      completed
      updatedAt
      createdAt
    }
  }
`;
