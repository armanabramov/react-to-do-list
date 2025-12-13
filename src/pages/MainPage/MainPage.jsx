import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, updateTodo, deleteTodo } from '../../store/todos/todoThunks';
import { selectLoading, selectError, selectTodos } from '../../store/todos/todoSelectors';
import { selectSearch } from '../../store/search';
import { selectSort } from '../../store/sort';
import { TodoForm, TodoList, SearchBar, SortToggle, Loader } from '../../components';
import styles from './MainPage.module.css';

export const MainPage = () => {
	const dispatch = useDispatch();

	const todos = useSelector(selectTodos);
	const search = useSelector(selectSearch);
	const sort = useSelector(selectSort);
	const loading = useSelector(selectLoading);
	const error = useSelector(selectError);

	useEffect(() => {
		dispatch(fetchTodos());
	}, [dispatch]);

	const handleUpdate = async (id, updates) => {
		dispatch(updateTodo(id, updates));
	};

	const handleDelete = async (id) => {
		dispatch(deleteTodo(id));
	};

	const query = search.trim().toLowerCase();

	const filtered = query
		? todos.filter((t) => (t.text || '').toLowerCase().includes(query))
		: todos;

	const displayedTodos = sort
		? [...filtered].sort((a, b) => (a.text || '').localeCompare(b.text || ''))
		: filtered;

	return (
		<>
			<div className={styles.container}>
				<h1 className={styles.title}>Todo (React + Vite)</h1>

				<TodoForm />

				<div className={styles.controlsRow}>
					<SearchBar />
					<SortToggle />
				</div>

				{loading && (
					<div className={styles.center}>
						<Loader />
					</div>
				)}
				{error && <div className={styles.error}>{error}</div>}

				<TodoList
					todos={displayedTodos}
					onUpdate={handleUpdate}
					onDelete={handleDelete}
				/>
			</div>
		</>
	);
};
