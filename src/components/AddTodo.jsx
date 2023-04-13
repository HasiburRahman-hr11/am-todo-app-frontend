import React, { useContext, useState } from "react";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import { TodoContext } from "../context/todoContext";
import { UserContext } from "../context/user-context/userContext";
import axios from "axios";
import {
  addTodoStart,
  addTodoSuccess,
  addTodoFailed,
} from "../context/todoAction";

const AddTodo = ({ handleClose }) => {
  const { dispatch } = useContext(TodoContext);
  const { user } = useContext(UserContext);

  const [inputValue, setInputValue] = useState("");
  const [date, setDate] = useState(new Date());
  const [loading , setLoading] = useState(false)

  const handleSubmit = async () => {
    if (inputValue === "") {
      return alert("Please add title");
    }
    if (!date) {
      return alert("Please pick a date");
    }
    dispatch(addTodoStart());
    let todo = {
      title: inputValue,
      tasks: [],
      user: user._id,
      date: date.toLocaleDateString('en-GB'),
    };
    setLoading(true);

    try {
      const { data } = await axios.post("https://am-todo-app-api.onrender.com/add-todo", todo);
      dispatch(addTodoSuccess(data));
      setInputValue("");
      setLoading(false);
      handleClose();
    } catch (error) {
      console.log(error);
      alert("Opps! Something went wrong");
      dispatch(addTodoFailed(error));
      setLoading(false);
      handleClose();
    }
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <TextField
        label="Title"
        variant="outlined"
        sx={{ width: "100%", margin: "15px 0" }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />


      <DatePicker value={date} onChange={(date) => setDate(date)} minDate={new Date()} style={{
        width:'100%',
        height:'50px'
      }} />

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ marginTop: "20px" , padding:'10px 20px' , minWidth:'100px' }}
      >
        {loading ? <CircularProgress sx={{color:'#fff' , width:'25px !important' , height:'25px !important'}} /> : 'Add'}
      </Button>
    </Box>
  );
};

export default AddTodo;
