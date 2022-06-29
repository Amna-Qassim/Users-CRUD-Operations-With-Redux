import {
  GET_USERS,
  DELETE_USER,
  ADD_USER,
  UPDATE_USER,
  GET_BALANCE,
  UPDATE_BALANCE,
  LOADING,
  HANDLE_Error,
} from "../actions/actionType";

const initialState = {
  users: [],
  balance: {
    usdBalance: 0,
    iqdBalance: 0,
  },
  loading: false,
  error: "",
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
    case UPDATE_BALANCE:
      return {
        ...state,
        loading: false,
      };
    case GET_BALANCE:
      return {
        ...state,
        balance: action.payload,
        loading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
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
