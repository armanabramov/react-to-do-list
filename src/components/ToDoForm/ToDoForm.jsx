import { useDispatch } from 'react-redux';
import { addTodo } from '../../store/todos/todoThunks';
import { useState } from 'react';
import styles from './TodoForm.module.css';

export const TodoForm = () => {
	const dispatch = useDispatch();
	const [text, setText] = useState('');

	const submit = (e) => {
		e.preventDefault();
		const value = text.trim();
		if (!value) return;
		dispatch(addTodo(value));
		setText('');
	};

	return (
		<form className={styles.form} onSubmit={submit}>
			<input
				className={styles.input}
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Добавить новое дело"
				aria-label="Добавить дело"
			/>
			<button className={styles.add} type="submit">
				Добавить
			</button>
		</form>
	);
};
