import {
  GET_USERS,
  DELETE_USER,
  ADD_USER,
  UPDATE_USER,
  HANDLE_Error,
  LOADING,
} from "./actionType";
import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));

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
    dispatch(handleLoading());
    await axios
      .get(`https://mes-backend.herokuapp.com/users`, {
        params: {
          skip: skip,
          take: take,
        },
        headers: {
          Authorization: `Bearer ${token}`,
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
    axios
      .delete(`https://mes-backend.herokuapp.com/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
    axios({
      method: "post",
      url: `https://mes-backend.herokuapp.com/users/register`,
      data: user,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
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
    axios
      .patch(`https://mes-backend.herokuapp.com/users/${id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        console.log("resp", resp);
        dispatch(userUpdated());
        dispatch(loadUsers());
      })
      .catch((error) => dispatch(handleError(error)));
  };
};
