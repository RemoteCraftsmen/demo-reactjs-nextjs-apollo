import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  InputAdornment,
  IconButton,
  Container
} from "@material-ui/core";
import { AddCircle, Assignment } from "@material-ui/icons";

import { ADD_TODO_MUTATION } from "../../graphql/todo/todoMutations";

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
      refetchQueries: ["TodosQuery"]
    });
    setDescription(" ");
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
          value={description}
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
