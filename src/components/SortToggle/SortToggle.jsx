import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../../store/sort';
import styles from './SortToggle.module.css';

export const SortToggle = () => {
	const dispatch = useDispatch();
	const active = useSelector((state) => state.sort);
	const handleToggle = () => {
		dispatch(setSort(!active));
	};
	return (
		<button className={styles.btn} onClick={handleToggle} aria-pressed={active}>
			{active ? 'Сортировка: A → Z' : 'Сортировка: нет'}
		</button>
	);
};
