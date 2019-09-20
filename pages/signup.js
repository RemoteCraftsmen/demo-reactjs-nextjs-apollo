import { Link as NextLink } from "next/link";
import { withApollo } from "../lib/apollo";
import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";
import Layout from "../components/Layout";
import RegisterForm from "../components/RegisterForm";
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

const Signup = () => {
  const classes = useStyles();
  return (
    <Layout>
      <Container maxWidth="sm" className={classes.root}>
        <Avatar justify="center" className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4" align="center">
          Sign Up
        </Typography>
        <RegisterForm />
        <Link component={NextLink} href="/login" variant="body2">
          Already have an account? Sign in
        </Link>
      </Container>
    </Layout>
  );
};

Signup.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (loggedInUser.me) {
    redirect(context, "/");
  }
  return { loggedInUser };
};

export default withApollo(Signup);
