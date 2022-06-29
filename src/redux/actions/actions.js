import instance from "../../utils/axios";
import {
  GET_USERS,
  DELETE_USER,
  ADD_USER,
  UPDATE_USER,
  GET_BALANCE,
  UPDATE_BALANCE,
  HANDLE_Error,
  LOADING,
} from "./actionType";

const getUsers = (users) => ({
  type: GET_USERS,
  payload: users,
});

const userDeleted = () => ({
  type: DELETE_USER,
});

const userAdded = () => ({
  type: ADD_USER,
});

const userUpdated = () => ({
  type: UPDATE_USER,
});

const getBalance = (balance) => ({
  type: GET_BALANCE,
  payload: balance,
});

const balanceUpdated = () => ({
  type: UPDATE_BALANCE,
});

export const handleLoading = () => ({
  type: LOADING,
});

const handleError = (error) => ({
  type: HANDLE_Error,
  payload: error,
});

export const loadUsers = (skip, take) => {
  return async function (dispatch) {
    dispatch(handleLoading());
    await instance
      .get(`/users`, {
        params: {
          skip: skip,
          take: take,
        },
      })
      .then((resp) => {
        console.log("resp", resp);
        dispatch(getUsers(resp.data));
      })
      .catch((error) => {
        dispatch(handleError(error));
        console.log(error);
      });
  };
};

export const deleteUser = (id) => {
  return function (dispatch) {
    instance
      .delete(`users/${id}`)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(userDeleted());
        dispatch(loadUsers());
      })
      .catch((error) => dispatch(handleError(error)));
  };
};

export const addUser = (user) => {
  return function (dispatch) {
    console.log("user", user);
    instance({
      method: "post",
      url: `users/register`,
      data: user,
    })
      .then((resp) => {
        console.log("resp", resp);
        dispatch(userAdded());
        dispatch(loadUsers());
      })
      .catch((error) => dispatch(handleError(error)));
  };
};

export const updateUser = (user, id) => {
  return function (dispatch) {
    instance
      .patch(`users/${id}`, user)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(userUpdated());
        dispatch(loadUsers());
      })
      .catch((error) => dispatch(handleError(error)));
  };
};

// Get and Update Balance

export const loadBalance = () => {
  return async function (dispatch) {
    dispatch(handleLoading());
    await instance
      .get(`/balances`)
      .then((resp) => {
        console.log("balance", resp);
        dispatch(getBalance(resp.data));
      })
      .catch((error) => {
        dispatch(handleError(error));
        console.log(error);
      });
  };
};

export const updateBalance = (data) => {
  return function (dispatch) {
    instance
      .patch("/balances", data)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(balanceUpdated());
        dispatch(loadBalance());
      })
      .catch((error) => dispatch(handleError(error)));
  };
};
