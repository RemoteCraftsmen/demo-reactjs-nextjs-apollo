import gql from "graphql-tag";

export const ADD_TODO_MUTATION = gql`
  mutation createTodo($description: String!) {
    createTodo(description: $description) {
      id
      description
      completed
    }
  }
`;

export const UPDATE_TODO_MUTATION = gql`
  mutation updateTodo($id: ID!, $completed: Boolean!) {
    updateTodo(id: $id, completed: $completed) {
      completed
    }
  }
`;

export const EDIT_TODO_MUTATION = gql`
  mutation editTodo($id: ID!, $description: String!) {
    editTodo(id: $id, description: $description) {
      description
    }
  }
`;

export const DELETE_TODO_MUTATION = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;
