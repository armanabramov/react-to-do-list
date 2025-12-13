import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { todoReducer } from './todos';
import { searchReducer } from './search';
import { sortReducer } from './sort';

const reducer = combineReducers({
	todos: todoReducer,
	search: searchReducer,
	sort: sortReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
