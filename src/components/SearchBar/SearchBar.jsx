import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './SearchBar.module.css';

export const SearchBar = ({ onSearch, placeholder }) => {
	const [value, setValue] = useState('');
	const debounced = useDebounce(value, 350);

	useEffect(() => {
		onSearch(debounced);
	}, [debounced, onSearch]);

	return (
		<input
			className={styles.input}
			value={value}
			onChange={(e) => setValue(e.target.value)}
			placeholder={placeholder || 'Поиск...'}
			aria-label="Поиск"
		/>
	);
};
