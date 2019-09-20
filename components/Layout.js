import Head from "next/head";
import { CssBaseline } from "@material-ui/core";

const Layout = ({ children }) => (
  <div>
    <Head>
      <title>Next.js Todo App</title>
    </Head>
    <CssBaseline />
    {children}
  </div>
);

export default Layout;
