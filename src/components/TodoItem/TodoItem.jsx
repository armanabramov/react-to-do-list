import { Link } from 'react-router-dom';
import styles from './TodoItem.module.css';

export const TodoItem = ({ todo }) => {
	return (
		<div className={styles.row}>
			<Link to={`/task/${todo.id}`} className={styles.textLink}>
				{todo.text}
			</Link>
		</div>
	);
};
