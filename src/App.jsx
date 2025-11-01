import styles from './App.module.css';
import Header from './components/Header';
import TodoList from './components/TodoList';

const App = () => {
	return (
		<>
			<Header />
			<main className={styles.main}>
				<TodoList />
			</main>
		</>
	);
};

export default App;
