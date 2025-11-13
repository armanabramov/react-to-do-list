import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import { Loader } from '../../components';
import { Todo, EditTodo } from '../TaskPage/components';
import styles from './TaskPage.module.css';
import { TodosAPI } from '../../api';

export const TaskPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [todo, setTodo] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [editing, setEditing] = useState(false);
	const [text, setText] = useState('');

	useEffect(() => {
		if (!id) return;
		const load = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await TodosAPI.getTodo(id);
				setTodo(data);
				setText(data?.text || '');
			} catch (err) {
				setError(err.message || 'Failed to load task');
			} finally {
				setLoading(false);
			}
		};
		load();
	}, [id]);

	if (loading)
		return (
			<div className={styles.center}>
				<Loader />
			</div>
		);
	if (!loading && error) return <Navigate to="/404" replace />;
	if (!loading && !todo) return null;

	const save = async (newText) => {
		try {
			const updated = await TodosAPI.updateTodo(todo.id, { text: newText });
			setTodo(updated);
			setText(updated.text);
			setEditing(false);
		} catch (err) {
			setError(err.message || 'Save failed');
		}
	};

	const remove = async () => {
		try {
			await TodosAPI.deleteTodo(todo.id);
			navigate('/');
		} catch (err) {
			setError(err.message || 'Delete failed');
		}
	};

	return (
		<div className={styles.taskPage}>
			<Link to="/">
				<button className={styles.backButton}>← назад</button>
			</Link>
			<h2 className={styles.title}>Дело #{todo.id}</h2>

			{!editing ? (
				<Todo todo={todo} setEditing={setEditing} remove={remove} />
			) : (
				<EditTodo text={text} save={save} setEditing={setEditing} />
			)}

			{error && <div className={styles.error}>{error}</div>}
		</div>
	);
};
