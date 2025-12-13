import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTodoById, updateTodo, deleteTodo } from '../../store/todos/todoThunks';
import {
	selectCurrentTodo,
	selectLoading,
	selectError,
} from '../../store/todos/todoSelectors';
import { Loader } from '../../components';
import { Todo, EditTodo } from '../TaskPage/components';
import styles from './TaskPage.module.css';

export const TaskPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const todo = useSelector(selectCurrentTodo);
	const loading = useSelector(selectLoading);
	const error = useSelector(selectError);

	const [editing, setEditing] = useState(false);
	const [text, setText] = useState('');

	useEffect(() => {
		if (id) {
			dispatch(getTodoById(id));
		}
	}, [id, dispatch]);

	useEffect(() => {
		if (todo) {
			setText(todo.text || '');
		}
	}, [todo]);

	if (loading)
		return (
			<div className={styles.center}>
				<Loader />
			</div>
		);
	if (!loading && error) return <Navigate to="/404" replace />;
	if (!todo) return null;

	const save = async (newText) => {
		await dispatch(updateTodo(todo.id, { text: newText }));
		setEditing(false);
	};

	const remove = async () => {
		await dispatch(deleteTodo(todo.id));
		navigate('/');
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
