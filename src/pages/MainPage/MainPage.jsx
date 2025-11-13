import { useEffect, useState } from 'react';
import styles from './MainPage.module.css';
import { TodoForm, TodoList, SearchBar, SortToggle, Loader } from '../../components';
import { TodosAPI } from '../../api';

export const MainPage = () => {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [alphabetSort, setAlphabetSort] = useState(false);

	const fetchTodos = async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await TodosAPI.fetchTodos();
			setTodos(data || []);
		} catch (err) {
			setError(err.message || 'Failed to load todos');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	const handleAdd = async (text) => {
		setLoading(true);
		try {
			const created = await TodosAPI.createTodo({ text, completed: false });
			setTodos((prev) => [...prev, created]);
		} catch (err) {
			setError(err.message || 'Add failed');
		} finally {
			setLoading(false);
		}
	};

	const handleUpdate = async (id, updates) => {
		try {
			const updated = await TodosAPI.updateTodo(id, updates);
			setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
		} catch (err) {
			setError(err.message || 'Update failed');
		}
	};

	const handleDelete = async (id) => {
		try {
			await TodosAPI.deleteTodo(id);
			setTodos((prev) => prev.filter((t) => t.id !== id));
		} catch (err) {
			setError(err.message || 'Delete failed');
		}
	};

	const query = searchPhrase.trim().toLowerCase();
	const filtered = query
		? todos.filter((todo) => (todo.text || '').toLowerCase().includes(query))
		: todos;
	const displayed = alphabetSort
		? [...filtered].sort((a, b) => {
				const ta = (a.text || '').toLowerCase();
				const tb = (b.text || '').toLowerCase();
				return ta.localeCompare(tb);
			})
		: filtered;

	return (
		<>
			<div className={styles.container}>
				<h1 className={styles.title}>Todo (React + Vite)</h1>

				<TodoForm onAdd={handleAdd} />

				<div className={styles.controlsRow}>
					<SearchBar onSearch={setSearchPhrase} placeholder="Поиск дел..." />
					<SortToggle active={alphabetSort} onToggle={() => setAlphabetSort((v) => !v)} />
				</div>

				{loading && (
					<div className={styles.center}>
						<Loader />
					</div>
				)}
				{error && <div className={styles.error}>{error}</div>}

				<TodoList todos={displayed} onUpdate={handleUpdate} onDelete={handleDelete} />
			</div>
		</>
	);
};
