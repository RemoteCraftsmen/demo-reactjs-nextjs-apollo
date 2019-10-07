import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { CircularProgress, List } from "@material-ui/core";

import Todo from "./Todo";
import { GET_TODOS_QUERY } from "../../graphql/todo/todoQueries";

export default function TodoList() {
  const { loading, error, data } = useQuery(GET_TODOS_QUERY);
  if (loading)
    return (
      <div style={{ width: "100%", textAlign: "center" }}>
        <CircularProgress style={{ margin: "50px", display: "inline-block" }} />
      </div>
    );
  const sortedData = data.userTodos.sort(
    (a, b) =>
      a.completed - b.completed ||
      ((a.completed === true && b.updatedAt - a.updatedAt) ||
        (a.completed === false && b.createdAt - a.createdAt))
  );
  return (
    <List>
      {sortedData.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </List>
  );
}
