import { useDispatch } from 'react-redux';
import { setSearch } from '../../store/search';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './SearchBar.module.css';

export const SearchBar = ({ placeholder = 'Поиск...' }) => {
	const dispatch = useDispatch();
	const [value, setValue] = useState('');
	const debounced = useDebounce(value, 350);

	useEffect(() => {
		dispatch(setSearch(debounced));
	}, [debounced, dispatch]);

	return (
		<input
			className={styles.input}
			value={value}
			onChange={(e) => setValue(e.target.value)}
			placeholder={placeholder}
			aria-label="Поиск"
		/>
	);
};
