import { useState } from 'react';
import styles from './ToDoItem.module.css';
import Checkbox from './Checkbox';

export default function ToDoItem({ id, title, completed }) {
	const [isCompleted, setIsCompleted] = useState(!!completed);

	const handleCheckboxChange = (newChecked) => {
		setIsCompleted(newChecked);
	};
	return (
		<li key={id} className={styles.tasks__item}>
			<Checkbox id={`todo-${id}`} checked={isCompleted} onChange={handleCheckboxChange} />
			<h3 className={`${styles.tasks__itemTitle} ${isCompleted ? styles.completed : ''}`}>
				{title}
			</h3>
		</li>
	);
}
