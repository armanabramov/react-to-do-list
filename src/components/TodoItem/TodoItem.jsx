import { useState } from 'react';
import styles from './TodoItem.module.css';

export const TodoItem = ({ todo, onUpdate, onDelete }) => {
	const [editing, setEditing] = useState(false);
	const [text, setText] = useState(todo.text || '');

	const startEdit = () => {
		setText(todo.text || '');
		setEditing(true);
	};

	const cancel = () => {
		setEditing(false);
		setText(todo.text || '');
	};

	const save = async () => {
		const val = text.trim();
		if (!val) return;
		await onUpdate(todo.id, { text: val });
		setEditing(false);
	};

	return (
		<div className={styles.row}>
			{!editing ? (
				<>
					<div className={styles.text}>{todo.text}</div>
					<div className={styles.controls}>
						<button className={styles.btn} onClick={startEdit}>
							Изменить
						</button>
						<button className={styles.del} onClick={() => onDelete(todo.id)}>
							Удалить
						</button>
					</div>
				</>
			) : (
				<>
					<input
						className={styles.input}
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
					<div className={styles.controls}>
						<button className={styles.btn} onClick={save}>
							Сохранить
						</button>
						<button className={styles.cancel} onClick={cancel}>
							Отмена
						</button>
					</div>
				</>
			)}
		</div>
	);
};
