import usersReducers from "./reducer";
import { combineReducers } from "redux";

const rootRedusers = combineReducers({
  data: usersReducers,
});

export default rootRedusers;
