import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { todoReducer } from './todos';
import { searchReducer } from './search';
import { sortReducer } from './sort';

const reducer = combineReducers({
	todos: todoReducer,
	search: searchReducer,
	sort: sortReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));
