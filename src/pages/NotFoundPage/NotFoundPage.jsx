import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export const NotFoundPage = () => {
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Ошибка 404</h2>
			<p className={styles.text}>Страница не найдена</p>
			<Link to="/" className={styles.link}>
				Вернуться на главную
			</Link>
		</div>
	);
};
