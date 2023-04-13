export const addTodoStart = () => ({ type: 'CREATE_TODO_START' });
export const addTodoSuccess = (todo) => ({ type: 'CREATE_TODO_SUCCESS', payload: todo });
export const addTodoFailed = (error) => ({ type: 'CREATE_TODO_FAILED', payload: error });


export const getTodosStart = () => ({ type: 'GET_TODOS_START' });
export const getTodosSuccess = (todos) => ({ type: 'GET_TODOS_SUCCESS', payload: todos });
export const getTodosFailed = (error) => ({ type: 'GET_TODOS_FAILED', payload: error });

export const deleteTodoStart = () => ({ type: 'DELETE_TODO_START' });
export const deleteTodoSuccess = (todos) => ({ type: 'DELETE_TODO_SUCCESS', payload: todos });
export const deleteTodoFailed = (error) => ({ type: 'DELETE_TODO_FAILED', payload: error });

export const addTaskStart = () => ({ type: 'CREATE_TASK_START' });
export const addTaskSuccess = (todos) => ({ type: 'CREATE_TASK_SUCCESS', payload: todos });
export const addTaskFailed = (error) => ({ type: 'CREATE_TASK_FAILED', payload: error });


export const deleteTaskStart = () => ({ type: 'CREATE_TASK_START' });
export const deleteTaskSuccess = (todos) => ({ type: 'CREATE_TASK_SUCCESS', payload: todos });
export const deleteTaskFailed = (error) => ({ type: 'CREATE_TASK_FAILED', payload: error });