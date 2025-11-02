const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const handleResponse = async (res) => {
	if (!res.ok) {
		const text = await res.text();
		throw new Error(text || 'API error');
	}
	return res.json();
};

export const TodosAPI = {
	fetchTodos: async () => {
		const res = await fetch(`${API_BASE_URL}/todos`);
		return handleResponse(res);
	},
	createTodo: async (todo) => {
		const res = await fetch(`${API_BASE_URL}/todos`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(todo),
		});
		return handleResponse(res);
	},
	updateTodo: async (id, updates) => {
		const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updates),
		});
		return handleResponse(res);
	},
	deleteTodo: async (id) => {
		const res = await fetch(`${API_BASE_URL}/todos/${id}`, { method: 'DELETE' });
		if (!res.ok) throw new Error('delete failed');
		return true;
	},
};
