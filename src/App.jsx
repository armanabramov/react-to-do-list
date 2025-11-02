import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { TodosAPI } from './api';
import { TodoForm, TodoList, SearchBar, SortToggle, Loader } from './components';

const App = () => {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [alphabetSort, setAlphabetSort] = useState(false);
	const [error, setError] = useState(null);

	const fetchTodos = async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await TodosAPI.fetchTodos();
			setTodos(data);
		} catch {
			setError('Не удалось загрузить дела');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	const addTodo = async (text) => {
		const newTodo = { text: text.trim() };
		try {
			const created = await TodosAPI.createTodo(newTodo);
			setTodos((prev) => [...prev, created]);
		} catch {
			setError('Не удалось добавить дело');
		}
	};

	const updateTodo = async (id, updates) => {
		try {
			const updated = await TodosAPI.updateTodo(id, updates);
			setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
		} catch {
			setError('Не удалось обновить дело');
		}
	};

	const deleteTodo = async (id) => {
		try {
			await TodosAPI.deleteTodo(id);
			setTodos((prev) => prev.filter((t) => t.id !== id));
		} catch {
			setError('Не удалось удалить дело');
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
		<div className={styles.container}>
			<h1 className={styles.title}>Todo (React + Vite)</h1>

			<div className={styles.controls}>
				<SearchBar onSearch={setSearchPhrase} placeholder="Поиск дел..." />
				<SortToggle active={alphabetSort} onToggle={() => setAlphabetSort((v) => !v)} />
			</div>

			<div className={styles.formWrap}>
				<TodoForm onAdd={addTodo} />
			</div>

			{error && <div className={styles.error}>{error}</div>}

			{loading ? (
				<Loader />
			) : (
				<TodoList todos={displayed} onUpdate={updateTodo} onDelete={deleteTodo} />
			)}
		</div>
	);
};

export default App;
