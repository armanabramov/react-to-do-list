import { useState, useEffect } from 'react';

export const useRequestGetTodos = () => {
	const [tasks, setTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Ошибка сети: ${response.status}`);
				}
				return response.json();
			})
			.then((tasks) => setTasks(tasks))
			.catch((error) => setError(error.message))
			.finally(() => setIsLoading(false));
	}, []);

	return { tasks, isLoading, error };
};
