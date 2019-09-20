import { useState } from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import redirect from "../lib/redirect";
import { TextField, Button, Grid, FormLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
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

export default function LoginForm() {
  const client = useApolloClient();
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onCompleted = data => {
    client.cache.reset().then(() => {
      redirect({}, "/dashboard");
    });
  };

  const onError = error => {
    console.error(error);
  };

  const [signIn, { error }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
    onError
  });

  return (
    <form
      className={classes.form}
      onSubmit={e => {
        e.preventDefault();
        signIn({
          variables: {
            email: email,
            password: password
          }
        });
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoFocus
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
            name="password"
            variant="outlined"
            required
            fullWidth
            label="Password"
            type="password"
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
        fullWidth
        variant="contained"
        color="primary"
      >
        SIGN IN
      </Button>
    </form>
  );
}
