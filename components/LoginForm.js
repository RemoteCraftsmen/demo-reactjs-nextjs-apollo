import { useState } from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import {
  TextField,
  Button,
  Grid,
  FormLabel,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";

import redirect from "../lib/redirect";
import { LOGIN_MUTATION } from "../graphql/user/userMutations";

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

  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = e => {
    e.preventDefault();
  };

  const onCompleted = data => {
    client.cache.reset().then(() => {
      redirect({}, "/dashboard");
    });
  };

  const onError = error => {};

  const [signIn, { error }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
    onError
  });

  const handleSubmit = e => {
    e.preventDefault();
    signIn({
      variables: {
        email: values.email,
        password: values.password
      }
    });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoFocus
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
            name="password"
            variant="outlined"
            required
            fullWidth
            label="Password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? (
                      <Visibility color="primary" />
                    ) : (
                      <VisibilityOff color="primary" />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
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
        fullWidth
        variant="contained"
        color="primary"
      >
        SIGN IN
      </Button>
    </form>
  );
}
