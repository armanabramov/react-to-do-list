import { TodoItem } from '../../components';
import styles from './TodoList.module.css';

export const TodoList = ({ todos, onUpdate, onDelete }) => {
	if (!todos || todos.length === 0) {
		return <div className={styles.empty}>Список дел пуст</div>;
	}

	return (
		<ul className={styles.list} aria-live="polite">
			{todos.map((t) => (
				<li key={t.id} className={styles.item}>
					<TodoItem todo={t} onUpdate={onUpdate} onDelete={onDelete} />
				</li>
			))}
		</ul>
	);
};
