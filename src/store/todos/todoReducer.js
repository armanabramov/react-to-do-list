import { todoActionTypes } from './todoActionTypes';

const initialTodoState = {
	todos: [],
	currentTodo: null,
	loading: false,
	error: null,
};

export const todoReducer = (state = initialTodoState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case todoActionTypes.SET_TODOS:
			return {
				...state,
				todos: payload,
			};

		case todoActionTypes.ADD_TODO:
			return {
				...state,
				todos: [...state.todos, payload],
			};

		case todoActionTypes.UPDATE_TODO: {
			const updatedTodos = state.todos.map((t) =>
				t.id === payload.id ? payload.data : t,
			);

			const updatedCurrent =
				state.currentTodo?.id === payload.id ? payload.data : state.currentTodo;

			return {
				...state,
				todos: updatedTodos,
				currentTodo: updatedCurrent,
			};
		}

		case todoActionTypes.SET_CURRENT_TODO:
			return {
				...state,
				currentTodo: payload,
			};

		case todoActionTypes.DELETE_TODO:
			return {
				...state,
				todos: state.todos.filter((t) => t.id !== payload),
			};

		case todoActionTypes.SET_ERROR:
			return {
				...state,
				error: payload,
			};

		case todoActionTypes.SET_LOADING:
			return {
				...state,
				loading: payload,
			};

		default:
			return state;
	}
};
