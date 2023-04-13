import React, { useContext, useEffect } from "react";

import Header from "../components/Header";
import TodoList from "../components/TodoList";
import { TodoContext } from "../context/todoContext";
import LoadingTodo from "../components/LoadingTodo";
import NoTodo from "../components/NoTodo";
import {
  getTodosFailed,
  getTodosStart,
  getTodosSuccess,
} from "../context/todoAction";
import axios from "axios";
import { UserContext } from "../context/user-context/userContext";

const Home = () => {
  const { dispatch, todos, loadingTodos } = useContext(TodoContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getAllTodos = async () => {
      dispatch(getTodosStart());
      try {
        const { data } = await axios.get(`https://am-todo-app-api.onrender.com/all-todos/${user._id}`);
        dispatch(getTodosSuccess(data));
      } catch (error) {
        console.log(error);
        dispatch(getTodosFailed(error));
      }
    };
    getAllTodos();
  }, []);

  if (loadingTodos) {
    return (
      <>
        <Header />
        <LoadingTodo />
      </>
    );
  } else if (!loadingTodos && todos.length === 0) {
    return (
      <>
        <Header />
        <NoTodo />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <TodoList />
      </>
    );
  }
};

export default Home;
