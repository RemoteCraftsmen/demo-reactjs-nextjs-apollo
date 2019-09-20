import { withApollo } from "../lib/apollo";
import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { Container } from "@material-ui/core";

const Dashboard = () => (
  <Layout>
    <NavBar />
    <Container maxWidth="lg">
      <AddTodo />
      <TodoList />
    </Container>
  </Layout>
);

Dashboard.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (!loggedInUser.me) {
    redirect(context, "/login");
  }
  return { loggedInUser };
};

export default withApollo(Dashboard);
