import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { TodoContext } from "../context/todoContext";
import {
  deleteTaskFailed,
  deleteTaskStart,
  deleteTaskSuccess,
} from "../context/todoAction";
import { UserContext } from "../context/user-context/userContext";

const TodoTask = ({ task, todoId }) => {
  const { dispatch } = React.useContext(TodoContext);
  const { user } = React.useContext(UserContext);
  const handleDelete = async () => {
    if (window.confirm("Delete this task?")) {
      dispatch(deleteTaskStart());
      try {
        const { data } = await axios.delete(
          `https://am-todo-app-api.onrender.com/delete-task/${todoId}?userId=${user._id}&taskId=${task._id}`);
        dispatch(deleteTaskSuccess(data));
      } catch (error) {
        console.log(error);
        dispatch(deleteTaskFailed(error));
      }
    }
  };
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={task.title} />
    </ListItem>
  );
};

export default TodoTask;
