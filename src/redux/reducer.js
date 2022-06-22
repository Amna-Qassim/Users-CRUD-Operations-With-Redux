import { GET_USERS, DELETE_USER, ADD_USER, UPDATE_USER } from "./actionType";

const initialState = {
  users: [],
  user: {},
  loading: true,
};

const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case DELETE_USER:
    case ADD_USER:
    case UPDATE_USER:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default usersReducers;
