import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const UPDATE_TODO_MUTATION = gql`
  mutation updateTodo($id: ID!, $completed: Boolean!) {
    updateTodo(id: $id, completed: $completed) {
      completed
    }
  }
`;

const DELETE_TODO_MUTATION = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

export default function Todo({ todo }) {
  const [deleteTodo] = useMutation(DELETE_TODO_MUTATION);
  const [updateTodo] = useMutation(UPDATE_TODO_MUTATION);

  const onDeleteTodo = e => {
    e.preventDefault();
    deleteTodo({
      variables: {
        id: todo.id
      },
      refetchQueries: ["TodosQuery"]
    });
  };

  const onUpdateTodo = e => {
    e.preventDefault();
    updateTodo({
      variables: {
        id: todo.id,
        completed: !todo.completed
      },
      refetchQueries: ["TodosQuery"]
    });
  };

  return (
    <ListItem
      style={{
        textDecoration: todo.completed ? "line-through" : "none"
      }}
      button
      dense
      onClick={onUpdateTodo}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          color="primary"
          checked={todo.completed}
          tabIndex={-1}
          disableRipple
          onChange={onUpdateTodo}
        />
      </ListItemIcon>
      <ListItemText primary={todo.description} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={onDeleteTodo}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
