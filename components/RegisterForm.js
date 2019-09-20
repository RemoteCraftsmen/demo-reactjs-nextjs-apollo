import React from "react";
import { useState } from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import redirect from "../lib/redirect";
import { TextField, Button, Grid, FormLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const SIGNUP_MUTATION = gql`
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

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: theme.spacing(4)
  },
  button: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.5)
  }
}));

export default function RegisterForm() {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onCompleted = data => {
    redirect({}, "/login");
  };

  const onError = error => {
    console.error(error);
  };

  const [signUp, { error }] = useMutation(SIGNUP_MUTATION, {
    onCompleted,
    onError
  });

  return (
    <form
      className={classes.form}
      onSubmit={e => {
        e.preventDefault();
        signUp({
          variables: {
            firstName,
            lastName,
            email,
            password
          }
        });
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoFocus
            autoComplete="firstName"
            label="First Name"
            name="firstName"
            variant="outlined"
            required
            fullWidth
            onChange={e => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="lastName"
            label="Last Name"
            name="lastName"
            variant="outlined"
            required
            fullWidth
            onChange={e => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="email"
            label="Email"
            name="email"
            variant="outlined"
            required
            fullWidth
            onChange={e => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="password"
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            required
            fullWidth
            onChange={e => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabel>{error && error.message}</FormLabel>
        </Grid>
      </Grid>
      <Button
        className={classes.button}
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
      >
        Sign up
      </Button>
    </form>
  );
}
