import { todoActionTypes } from './todoActionTypes';

export const setLoading = (isLoading) => ({
	type: todoActionTypes.SET_LOADING,
	payload: isLoading,
});

export const setError = (error) => ({
	type: todoActionTypes.SET_ERROR,
	payload: error,
});

export const setTodos = (todos) => ({
	type: todoActionTypes.SET_TODOS,
	payload: todos,
});

export const addTodoAction = (todo) => ({
	type: todoActionTypes.ADD_TODO,
	payload: todo,
});

export const updateTodoAction = (id, data) => ({
	type: todoActionTypes.UPDATE_TODO,
	payload: { id, data },
});

export const deleteTodoAction = (id) => ({
	type: todoActionTypes.DELETE_TODO,
	payload: id,
});

export const setCurrentTodo = (todo) => ({
	type: todoActionTypes.SET_CURRENT_TODO,
	payload: todo,
});
