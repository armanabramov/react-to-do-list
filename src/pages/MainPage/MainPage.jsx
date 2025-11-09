import { useState } from 'react';
import styles from './MainPage.module.css';
import { TodoForm, TodoList, SearchBar, SortToggle } from '../../components';

export const MainPage = ({ todos, loading, onAdd }) => {
	const [searchPhrase, setSearchPhrase] = useState('');
	const [alphabetSort, setAlphabetSort] = useState(false);

	const query = searchPhrase.trim().toLowerCase();
	const filtered = query
		? todos.filter((todo) => (todo.text || '').toLowerCase().includes(query))
		: todos;
	const displayed = alphabetSort
		? [...filtered].sort((a, b) => {
				const ta = (a.text || '').toLowerCase();
				const tb = (b.text || '').toLowerCase();
				return ta.localeCompare(tb);
			})
		: filtered;

	return (
		<>
			<div className={styles.controls}>
				<SearchBar onSearch={setSearchPhrase} placeholder="Поиск дел..." />
				<SortToggle active={alphabetSort} onToggle={() => setAlphabetSort((v) => !v)} />
			</div>
			<div className={styles.formWrap}>
				<TodoForm onAdd={onAdd} />
			</div>
			{!loading && <TodoList todos={displayed} />}
		</>
	);
};
