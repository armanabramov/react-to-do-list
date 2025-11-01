import styles from './TodoList.module.css';
import Loader from './Loader';
import ToDoItem from './ToDoItem';
import { useRequestGetTodos } from '../hooks';

export default function TodoList() {
	const { tasks, isLoading, error } = useRequestGetTodos();

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return <div className={styles.error}>{error}</div>;
	}

	return (
		<div className={styles.tasks__container}>
			<ul className={styles.tasks__list}>
				{tasks.map(({ id, title, completed }) => (
					<ToDoItem key={id} id={id} title={title} completed={completed} />
				))}
			</ul>
		</div>
	);
}
