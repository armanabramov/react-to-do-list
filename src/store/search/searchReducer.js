const SET_SEARCH = 'search/SET_SEARCH';

export const setSearch = (value) => ({
	type: SET_SEARCH,
	payload: value,
});

const initialState = '';

export const searchReducer = (state = initialState, action) => {
	if (action.type === SET_SEARCH) {
		return action.payload;
	}
	return state;
};
