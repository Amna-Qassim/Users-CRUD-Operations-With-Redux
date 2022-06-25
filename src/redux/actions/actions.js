import instance from "../../utils/axios";
import {
  GET_USERS,
  DELETE_USER,
  ADD_USER,
  UPDATE_USER,
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

export const handleLoading = () => ({
  type: LOADING,
});
const handleError = (error) => ({
  type: HANDLE_Error,
  payload: error,
});

export const loadUsers = (skip, take) => {
  return async function (dispatch) {
    // const token = JSON.parse(localStorage.getItem("token"));
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
