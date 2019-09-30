import gql from "graphql-tag";

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query Me {
          me {
            id
            firstName
          }
        }
      `
    })
    .then(({ data }) => {
      return { loggedInUser: data };
    })
    .catch(() => {
      return { loggedInUser: {} };
    });
