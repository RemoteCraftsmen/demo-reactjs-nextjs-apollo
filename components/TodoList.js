import React from "react";
import Todo from "./Todo";
import { List } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import CircularProgress from "@material-ui/core/CircularProgress";

export const GET_TODOS_QUERY = gql`
  query TodosQuery {
    userTodos {
      id
      description
      completed
    }
  }
`;

export default function TodoList() {
  const { loading, error, data } = useQuery(GET_TODOS_QUERY);
  if (loading)
    return (
      <div style={{ width: "100%", textAlign: "center" }}>
        <CircularProgress style={{ margin: "50px", display: "inline-block" }} />
      </div>
    );
  return (
    <List>
      {data.userTodos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </List>
  );
}
