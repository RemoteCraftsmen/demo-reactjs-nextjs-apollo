import { Link as NextLink } from "next/link";
import { withApollo } from "../lib/apollo";
import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";
import { Container, Typography, Link, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(24),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: "10px",
    backgroundColor: "#1a49a4"
  }
}));

const Login = () => {
  const classes = useStyles();
  return (
    <Layout>
      <Container maxWidth="sm" className={classes.root}>
        <Avatar justify="center" className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4" align="center">
          Login
        </Typography>
        <LoginForm />
        <Link component={NextLink} href="/signup" variant="body2">
          Don't have an account? Sign up
        </Link>
      </Container>
    </Layout>
  );
};

Login.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (loggedInUser.me) {
    redirect(context, "/dashboard");
  }
  return { loggedInUser };
};

export default withApollo(Login);
