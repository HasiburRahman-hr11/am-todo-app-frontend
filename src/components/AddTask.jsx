import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { TodoContext } from "../context/todoContext";
import {
  addTaskStart,
  addTaskSuccess,
  addTaskFailed,
} from "../context/todoAction";
import axios from "axios";
import { UserContext } from "../context/user-context/userContext";

const AddTask = ({ todoId }) => {
  const { dispatch } = useContext(TodoContext);
  const { user } = useContext(UserContext);

  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      if (inputValue === "") {
        return alert("Please add title");
      }
      dispatch(addTaskStart());
      try {
        let task = { title: inputValue };
        const { data } = await axios.post(
          `http://localhost:8000/add-task/${todoId}?userId=${user._id}`,
          { task: task }
        );
        dispatch(addTaskSuccess(data));
        setInputValue("");
      } catch (error) {
        console.log(error);
        dispatch(addTaskFailed(error));
      }
    }
  };

  return (
    <TextField
      label="Add Task"
      variant="outlined"
      autoComplete="off"
      sx={{ width: "100%" }}
      value={inputValue}
      onKeyDown={handleKeyDown}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};

export default AddTask;
