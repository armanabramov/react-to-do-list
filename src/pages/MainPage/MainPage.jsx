import { useState } from 'react';
import styles from './MainPage.module.css';
import { TodoForm, TodoList, SearchBar, SortToggle, Loader } from '../../components';
import { useTodos } from '../../context/useTodos';

export const MainPage = () => {
	const { todos, loading, error, addTodo, updateTodo, deleteTodo } = useTodos();

	const [searchPhrase, setSearchPhrase] = useState('');
	const [alphabetSort, setAlphabetSort] = useState(false);

	const handleAdd = async (text) => {
		try {
			await addTodo(text);
		} catch {
			// handled in context
		}
	};

	const handleUpdate = async (id, updates) => {
		try {
			await updateTodo(id, updates);
		} catch {
			// handled in context
		}
	};

	const handleDelete = async (id) => {
		try {
			await deleteTodo(id);
		} catch {
			// handled in context
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
