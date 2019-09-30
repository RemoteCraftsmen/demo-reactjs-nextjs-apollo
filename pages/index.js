import React from "react";

import Layout from "../components/Layout";
import { withApollo } from "../lib/apollo";
import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";

const IndexPage = () => <Layout>Index Page</Layout>;

IndexPage.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (!loggedInUser.me) {
    redirect(context, "/login");
  } else redirect(context, "/dashboard");
  return { loggedInUser };
};

export default withApollo(IndexPage);
