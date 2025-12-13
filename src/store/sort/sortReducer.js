const SET_SORT = 'sort/SET_SORT';

export const setSort = (value) => ({
	type: SET_SORT,
	payload: value,
});

const initialState = 'asc';

export const sortReducer = (state = initialState, action) => {
	if (action.type === SET_SORT) {
		return action.payload;
	}
	return state;
};
