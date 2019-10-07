import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { CircularProgress, List, TablePagination } from "@material-ui/core";

import Todo from "./Todo";
import { GET_TODOS_QUERY } from "../../graphql/todo/todoQueries";

export default function TodoList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
    <div>
      <List>
        {sortedData
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map(todo => (
            <Todo key={todo.id} todo={todo} />
          ))}
      </List>
      {sortedData.length > 0 && (
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          count={sortedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
}
