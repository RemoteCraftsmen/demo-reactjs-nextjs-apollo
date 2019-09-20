import React from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import redirect from "../lib/redirect";

const SIGNOUT_MUTATION = gql`
  mutation signOut {
    signOut
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

export default function NavBar() {
  const classes = useStyles();
  const apolloClient = useApolloClient();

  const onCompleted = () => {
    apolloClient.cache.reset().then(() => {
      redirect({}, "/login");
    });
  };

  const [signOut, { error }] = useMutation(SIGNOUT_MUTATION, {
    onCompleted
  });

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Dashboard
        </Typography>
        <Button color="inherit" onClick={signOut}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
