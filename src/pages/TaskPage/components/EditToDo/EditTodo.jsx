import { useEffect, useState } from 'react';
import styles from './EditTodo.module.css';

export const EditTodo = ({ text: initialText, save, setEditing }) => {
	const [textEdit, setTextEdit] = useState(initialText);
	useEffect(() => {
		setTextEdit(initialText);
	}, [initialText]);

	const onSave = () => {
		save(textEdit);
	};

	return (
		<>
			<input
				className={styles.input}
				value={textEdit}
				onChange={(e) => setTextEdit(e.target.value)}
			/>
			<div className={styles.controls}>
				<button className={styles.btn} onClick={onSave}>
					Сохранить
				</button>
				<button className={styles.cancel} onClick={() => setEditing(false)}>
					Отмена
				</button>
			</div>
		</>
	);
};
