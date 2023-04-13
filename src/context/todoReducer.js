const todoReducer = (state, action) => {
  switch (action.type) {
    // CREATE todos
    case "CREATE_TODO_START":
      return {
        todos: [...state.todos],
        loadingTodos: false,
        error: null,
      };

    case "CREATE_TODO_SUCCESS":
      return {
        todos: [...state.todos, action.payload],
        loadingTodos: false,
        error: null,
      };

    case "CREATE_TODO_FAILED":
      return {
        todos: [...state.todos],
        loadingTodos: false,
        error: action.payload,
      };

    // Get Todos
    case "GET_TODOS_START":
      return {
        todos: [...state.todos],
        loadingTodos: true,
        error: null,
      };

    case "GET_TODOS_SUCCESS":
      return {
        todos: [...action.payload],
        loadingTodos: false,
        error: null,
      };

    case "GET_TODOS_FAILED":
      return {
        todos: [...state.todos],
        loadingTodos: false,
        error: action.payload,
      };

    // Get Todos
    case "DELETE_TODO_START":
      return {
        todos: [...state.todos],
        loadingTodos: false,
        error: null,
      };

    case "DELETE_TODO_SUCCESS":
      return {
        todos: [...action.payload],
        loadingTodos: false,
        error: null,
      };

    case "DELETE_TODO_FAILED":
      return {
        todos: [...state.todos],
        loadingTodos: false,
        error: action.payload,
      };

    // CREATE Tasks
    case "CREATE_TASK_START":
      return {
        todos: [...state.todos],
        loadingTodos: false,
        error: null,
      };

    case "CREATE_TASK_SUCCESS":
      return {
        todos: [...action.payload],
        loadingTodos: false,
        error: null,
      };

    case "CREATE_TASK_FAILED":
      return {
        todos: [...state.todos],
        loadingTodos: false,
        error: action.payload,
      };

    // Delete Task
    case "DELETE_TASK_START":
      return {
        todos: [...state.todos],
        loadingTodos: false,
        error: null,
      };

    case "DELETE_TASK_SUCCESS":
      return {
        todos: [...action.payload],
        loadingTodos: false,
        error: null,
      };

    case "DELETE_TASK_FAILED":
      return {
        todos: [...state.todos],
        loadingTodos: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default todoReducer;
