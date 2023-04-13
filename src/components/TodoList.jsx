import * as React from "react";
import { useContext } from "react";
import {
  Box,
  List,
  Grid,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import TodoTask from "./TodoTask";
import AddTask from "./AddTask";
import { TodoContext } from "../context/todoContext";
import axios from "axios";
import {
  deleteTodoFailed,
  deleteTodoStart,
  deleteTodoSuccess,
} from "../context/todoAction";
import { UserContext } from "../context/user-context/userContext";

export default function InteractiveList() {
  const { todos, dispatch } = useContext(TodoContext);
  const { user } = useContext(UserContext);

  const deleteTodo = async (todoId) => {
    if (window.confirm("Delete this Todo List?")) {
      dispatch(deleteTodoStart());
      try {
        const { data } = await axios.delete(
          `https://am-todo-app-api.onrender.com/delete-todo/${todoId}?userId=${user._id}`
        );
        dispatch(deleteTodoSuccess(data));
      } catch (error) {
        console.log(error);
        dispatch(deleteTodoFailed(error));
      }
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        background: "#f1f1f1",
        marginTop: "35px",
        minHeight: "calc(100vh - 35px)",
        overflowX:'hidden'
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{ flexWrap: "nowrap", flexDirection: "row" , overflowX:'auto' , width:'auto' , minHeight: "calc(100vh - 30px)"}}
        className="todo-scroll"
      >
        {todos.map((todo, index) => (
          <Grid key={index} item sm={4} md={4} minWidth="30vw">
            <Box sx={{ background: "#fff" }}>
              <Box sx={{ position: "relative" }}>
                <Typography
                  sx={{
                    mt: 4,
                    pb: 2,
                    pt:2,
                    textAlign: "center",
                    borderBottom: "1px solid #ddd",
                  }}
                  variant="h6"
                  component="div"
                >
                  {todo.title}{" "}
                  {todo?.date && <Box component="span" sx={{
                    background:'#f5f5f5',
                    fontSize:'14px',
                    caolor:'#333',
                    padding:'7px 10px',
                    borderRadius:'6px'
                  }}> ({todo.date})</Box>}
                </Typography>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  sx={{
                    position: "absolute",
                    top: "14px",
                    right: "15px",
                  }}
                  onClick={() => deleteTodo(todo._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Box sx={{ padding: "0 15px", mt: "15px" }}>
                <AddTask todoId={todo?._id} />
              </Box>
              <List
                sx={{ maxHeight: "calc(100vh - 40px)", overflowY: "scroll" }}
                className="task-scroll"
              >
                {todo?.tasks.length === 0 ? (
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{
                      textAlign: "center",
                      padding: "15px 0",
                      opacity: "0.4",
                    }}
                  >
                    No Task Added Yet
                  </Typography>
                ) : (
                  <>
                    {todo?.tasks.map((task, index) => (
                      <TodoTask key={index} task={task} todoId={todo?._id} />
                    ))}
                  </>
                )}
              </List>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
