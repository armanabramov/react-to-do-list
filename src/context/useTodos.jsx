import { useContext } from 'react';
import TodoContext from './TodoContext';

export const useTodos = () => {
	const ctx = useContext(TodoContext);
	if (!ctx) throw new Error('useTodos must be used within a TodoProvider');
	return ctx;
};

export default useTodos;
