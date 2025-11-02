import { useState } from 'react';
import styles from './TodoForm.module.css';

export const TodoForm = ({ onAdd }) => {
	const [text, setText] = useState('');

	const submit = (e) => {
		e.preventDefault();
		const val = text.trim();
		if (!val) return;
		onAdd(val);
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
