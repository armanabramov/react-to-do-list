import styles from './SortToggle.module.css';

export const SortToggle = ({ active, onToggle }) => {
	return (
		<button className={styles.btn} onClick={onToggle} aria-pressed={active}>
			{active ? 'Сортировка: A → Z' : 'Сортировка: нет'}
		</button>
	);
};
