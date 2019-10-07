import { Container } from "@material-ui/core";

import { withApollo } from "../lib/apollo";
import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import TodoAdd from "../components/Todo/TodoAdd";
import TodoList from "../components/Todo/TodoList";

const Dashboard = () => (
  <Layout title="Dashboard">
    <NavBar />
    <Container maxWidth="lg">
      <TodoAdd />
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
