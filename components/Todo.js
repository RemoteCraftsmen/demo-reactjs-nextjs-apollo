import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
  Tooltip
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import TodoEditDialog from "./TodoEditDialog";
import {
  UPDATE_TODO_MUTATION,
  EDIT_TODO_MUTATION,
  DELETE_TODO_MUTATION
} from "../graphql/todo/todoMutations";

export default function Todo({ todo }) {
  const [deleteTodo] = useMutation(DELETE_TODO_MUTATION);
  const [updateTodo] = useMutation(UPDATE_TODO_MUTATION);
  const [editTodo] = useMutation(EDIT_TODO_MUTATION);

  const [open, setOpen] = useState(false);

  const onDeleteTodo = () => {
    deleteTodo({
      variables: {
        id: todo.id
      },
      refetchQueries: ["TodosQuery"]
    });
  };

  const onUpdateTodo = () => {
    updateTodo({
      variables: {
        id: todo.id,
        completed: !todo.completed
      },
      refetchQueries: ["TodosQuery"]
    });
  };

  const onEditTodo = description => {
    showEditDialog(false);
    editTodo({
      variables: {
        id: todo.id,
        description
      },
      refetchQueries: ["TodosQuery"]
    });
  };

  const showEditDialog = isOpen => {
    setOpen(isOpen);
  };

  return (
    <ListItem
      style={{
        textDecoration: todo.completed ? "line-through" : "none"
      }}
      dense
      divider
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
        <Tooltip title="Edit">
          <IconButton aria-label="edit" onClick={() => showEditDialog(true)}>
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
        <TodoEditDialog
          open={open}
          desc={todo.description}
          handleClose={() => showEditDialog(false)}
          handleEdit={onEditTodo}
        ></TodoEditDialog>
        <Tooltip title="Delete">
          <IconButton edge="end" aria-label="delete" onClick={onDeleteTodo}>
            <DeleteIcon color="primary" />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
