import styles from './App.module.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage, NotFoundPage, TaskPage } from './pages';

const App = () => {
	return (
		<div className={styles.app}>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/task/:id" element={<TaskPage />} />
				<Route path="/404" element={<NotFoundPage />} />
				<Route path="*" element={<Navigate to="/404" replace />} />
			</Routes>
		</div>
	);
};

export default App;
