import { SET_TOKEN, SET_USER } from "../actions/types";

const initialState = {
	user: {},
	token: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return { ...state, user: action.payload };
		case SET_TOKEN:
			return { ...state, token: action.payload };
		default:
			return state;
	}
};
