import { createContext, useState, useEffect } from 'react';
import { TodosAPI } from '../api';

const TodoContext = createContext(null);

export const TodoProvider = ({ children }) => {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		let mounted = true;
		const load = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await TodosAPI.fetchTodos();
				if (!mounted) return;
				setTodos(data || []);
			} catch (err) {
				if (!mounted) return;
				setError(err?.message || 'Failed to load todos');
			} finally {
				setLoading(false);
			}
		};
		load();
		return () => {
			mounted = false;
		};
	}, []);

	const fetchTodos = async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await TodosAPI.fetchTodos();
			setTodos(data || []);
			return data;
		} catch (err) {
			setError(err?.message || 'Failed to load todos');
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const addTodo = async (text) => {
		setLoading(true);
		setError(null);
		try {
			const created = await TodosAPI.createTodo({ text, completed: false });
			setTodos((prev) => [...prev, created]);
			return created;
		} catch (err) {
			setError(err?.message || 'Add failed');
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const updateTodo = async (id, updates) => {
		setError(null);
		try {
			const updated = await TodosAPI.updateTodo(id, updates);
			setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
			return updated;
		} catch (err) {
			setError(err?.message || 'Update failed');
			throw err;
		}
	};

	const deleteTodo = async (id) => {
		setError(null);
		try {
			await TodosAPI.deleteTodo(id);
			setTodos((prev) => prev.filter((t) => t.id !== id));
			return true;
		} catch (err) {
			setError(err?.message || 'Delete failed');
			throw err;
		}
	};

	const getTodoById = async (id) => {
		const local = todos.find((t) => String(t.id) === String(id));
		if (local) return local;
		const fetched = await TodosAPI.getTodo(id);
		if (fetched) {
			setTodos((prev) => {
				if (prev.find((p) => String(p.id) === String(fetched.id))) return prev;
				return [...prev, fetched];
			});
		}
		return fetched;
	};

	return (
		<TodoContext.Provider
			value={{
				todos,
				loading,
				error,
				fetchTodos,
				addTodo,
				updateTodo,
				deleteTodo,
				getTodoById,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export default TodoContext;
