import { combineReducers } from "redux";
import { UserReducer } from "./reducers";

const RootReducer = combineReducers({
	user: UserReducer
});

export default RootReducer;
