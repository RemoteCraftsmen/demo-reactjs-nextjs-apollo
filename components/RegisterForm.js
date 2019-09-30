import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { TextField, Button, Grid, FormLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import redirect from "../lib/redirect";
import { SIGNUP_MUTATION } from "../graphql/user/userMutations";

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

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onCompleted = data => {
    redirect({}, "/login");
  };

  const onError = error => {};

  const [signUp, { error }] = useMutation(SIGNUP_MUTATION, {
    onCompleted,
    onError
  });

  const handleSubmit = e => {
    e.preventDefault();
    const { firstName, lastName, email, password } = values;
    signUp({
      variables: {
        firstName,
        lastName,
        email,
        password
      }
    });
  };

  return (
    <form className={classes.form} onSubmit={e => handleSubmit(e)}>
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
            value={values.firstName}
            onChange={handleChange("firstName")}
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
            values={values.lastName}
            onChange={handleChange("lastName")}
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
            value={values.email}
            onChange={handleChange("email")}
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
            value={values.password}
            onChange={handleChange("password")}
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabel>
            {error && error.message.replace("GraphQL error:", "").trim()}
          </FormLabel>
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
