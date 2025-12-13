import { TodosAPI } from '../../api';
import {
	setError,
	setLoading,
	setTodos,
	addTodoAction,
	updateTodoAction,
	deleteTodoAction,
	setCurrentTodo,
} from './todoActions';

import { selectTodos } from './todoSelectors';

export const fetchTodos = () => {
	return async function (dispatch) {
		dispatch(setLoading(true));
		dispatch(setError(null));

		try {
			const data = await TodosAPI.fetchTodos();
			dispatch(setTodos(data));
		} catch (error) {
			dispatch(setError(error.message || 'Error'));
		} finally {
			dispatch(setLoading(false));
		}
	};
};

export const addTodo = (text) => {
	return async function (dispatch) {
		dispatch(setLoading(true));
		dispatch(setError(null));

		try {
			const created = await TodosAPI.createTodo({ text, completed: false });
			dispatch(addTodoAction(created));
			return created;
		} catch (error) {
			dispatch(setError(error.message));
			throw error;
		} finally {
			dispatch(setLoading(false));
		}
	};
};

export const updateTodo = (id, updates) => {
	return async function (dispatch) {
		dispatch(setError(null));

		try {
			const updated = await TodosAPI.updateTodo(id, updates);
			dispatch(updateTodoAction(id, updated));
			return updated;
		} catch (error) {
			dispatch(setError(error.message));
			throw error;
		}
	};
};

export const getTodoById = (id) => {
	return async function (dispatch, getState) {
		const state = getState();
		const todos = selectTodos(state);

		const local = todos.find((t) => String(t.id) === String(id));
		if (local) {
			dispatch(setCurrentTodo(local));
			return local;
		}

		try {
			const fetched = await TodosAPI.getTodo(id);
			dispatch(addTodoAction(fetched));
			dispatch(setCurrentTodo(fetched));
			return fetched;
		} catch (error) {
			dispatch(setError(error.message));
			throw error;
		}
	};
};

export const deleteTodo = (id) => {
	return async function (dispatch) {
		dispatch(setError(null));

		try {
			await TodosAPI.deleteTodo(id);
			dispatch(deleteTodoAction(id));
			return true;
		} catch (error) {
			dispatch(setError(error.message));
			throw error;
		}
	};
};
