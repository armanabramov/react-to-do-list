import { useState } from 'react';
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import { Loader } from '../../components';
import itemStyles from '../../components/TodoItem/TodoItem.module.css';
import pageStyles from './TaskPage.module.css';

export const TaskPage = ({ todos, loading, onUpdate, onDelete }) => {
	const { id } = useParams();
	const navigate = useNavigate();

	const todo = todos.find((t) => t.id.toString() === id);

	const [editing, setEditing] = useState(false);
	const [text, setText] = useState(todo?.text || '');
	const [taskError, setTaskError] = useState(null);

	useState(() => {
		if (todo) {
			setText(todo.text || '');
		}
	}, [todo]);

	const startEdit = () => {
		setText(todo.text || '');
		setEditing(true);
		setTaskError(null);
	};

	const cancel = () => {
		setEditing(false);
		setText(todo.text || '');
		setTaskError(null);
	};

	const save = async () => {
		const val = text.trim();
		if (!val) {
			setTaskError('Текст задачи не может быть пустым');
			return;
		}
		try {
			await onUpdate(todo.id, { text: val });
			setEditing(false);
			setTaskError(null);
		} catch (err) {
			setTaskError(err.message);
		}
	};

	const remove = async () => {
		if (window.confirm('Вы уверены, что хотите удалить задачу?')) {
			try {
				await onDelete(todo.id);
				navigate('/');
			} catch (err) {
				setTaskError(err.message);
			}
		}
	};

	const goBack = () => navigate(-1);

	if (loading) {
		return <Loader />;
	}

	if (!todo) {
		return <Navigate to="/404" replace />;
	}

	return (
		<div className={pageStyles.taskPage}>
			<button onClick={goBack} className={pageStyles.backButton}>
				&larr; Назад
			</button>

			<div className={itemStyles.row}>
				{!editing ? (
					<>
						<div className={pageStyles.fullText}>{todo.text}</div>
						<div className={itemStyles.controls}>
							<button className={itemStyles.btn} onClick={startEdit}>
								Изменить
							</button>
							<button className={itemStyles.del} onClick={remove}>
								Удалить
							</button>
						</div>
					</>
				) : (
					<>
						<textarea
							className={pageStyles.textarea}
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>
						<div className={itemStyles.controls}>
							<button className={itemStyles.btn} onClick={save}>
								Сохранить
							</button>
							<button className={itemStyles.cancel} onClick={cancel}>
								Отмена
							</button>
						</div>
					</>
				)}
			</div>
			{taskError && <div className={pageStyles.error}>{taskError}</div>}
		</div>
	);
};
