import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styles from './App.module.css';
import { TodosAPI } from './api';
import { Loader } from './components';
import { MainPage, NotFoundPage, TaskPage } from './pages';

const App = () => {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(false);
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

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Todo (React + Vite)</h1>
			{loading && <Loader />}
			{error && !loading && <div className={styles.error}>{error}</div>}
			<Routes>
				<Route
					path="/"
					element={
						<MainPage todos={todos} loading={loading} error={error} onAdd={addTodo} />
					}
				/>
				<Route
					path="/task/:id"
					element={
						<TaskPage
							todos={todos}
							loading={loading}
							onUpdate={updateTodo}
							onDelete={deleteTodo}
						/>
					}
				/>
				<Route path="/404" element={<NotFoundPage />} />
				<Route path="*" element={<Navigate to="/404" replace />} />
			</Routes>
		</div>
	);
};

export default App;
