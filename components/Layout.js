import Head from "next/head";
import { CssBaseline } from "@material-ui/core";

const Layout = ({ children, title = "Next.js Todo App" }) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <CssBaseline />
    {children}
  </div>
);

export default Layout;
