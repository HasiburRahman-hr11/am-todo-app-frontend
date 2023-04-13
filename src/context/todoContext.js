import React, { createContext, useReducer } from "react";
import todoReducer from "./todoReducer";

let initialState = {
  todos: [],
  loadingTodos: true,
  success: false,
  error: null,
};

export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loadingTodos: state.loadingTodos,
        success: state.success,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
