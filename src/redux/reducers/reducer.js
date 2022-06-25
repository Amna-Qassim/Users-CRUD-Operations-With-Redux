import {
  GET_USERS,
  DELETE_USER,
  ADD_USER,
  UPDATE_USER,
  LOADING,
  HANDLE_Error,
} from "../actions/actionType";

const initialState = {
  users: [],
  loading: false,
  error: "",
};

const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
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
    case HANDLE_Error:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducers;
