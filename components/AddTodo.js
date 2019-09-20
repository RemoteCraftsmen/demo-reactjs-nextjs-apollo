import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  InputAdornment,
  IconButton,
  Container
} from "@material-ui/core";
import { AddCircle, Assignment } from "@material-ui/icons";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { GET_TODOS_QUERY } from "./TodoList";

const ADD_TODO_MUTATION = gql`
  mutation createTodo($description: String!) {
    createTodo(description: $description) {
      id
      description
      completed
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    padding: "4px 0px",
    display: "flex",
    alignItems: "center",
    height: "50px",
    marginTop: "150px",
    marginBottom: "30px"
  },
  input: {
    flex: 1
  },
  btn: {
    marginRight: "10px"
  }
}));

export default function AddTodo() {
  const classes = useStyles();
  const [description, setDescription] = useState("");

  const [createTodo, { loading }] = useMutation(ADD_TODO_MUTATION);

  const onAddTodo = e => {
    e.preventDefault();
    createTodo({
      variables: {
        description
      },
      update: (proxy, { data: { createTodo } }) => {
        const data = proxy.readQuery({
          query: GET_TODOS_QUERY
        });
        proxy.writeQuery({
          query: GET_TODOS_QUERY,
          data: {
            ...data,
            userTodos: [...data.userTodos, createTodo]
          }
        });
      }
    });
  };

  return (
    <Container className={classes.root}>
      <form className={classes.input} onSubmit={onAddTodo}>
        <TextField
          autoFocus
          placeholder="Something to do.."
          name="input"
          variant="outlined"
          fullWidth
          required
          onChange={e => setDescription(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" className={classes.btn}>
                <IconButton edge="end" type="submit" disabled={loading}>
                  <AddCircle color="primary" />
                </IconButton>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="start">
                <Assignment color="primary" />
              </InputAdornment>
            )
          }}
        />
      </form>
    </Container>
  );
}
