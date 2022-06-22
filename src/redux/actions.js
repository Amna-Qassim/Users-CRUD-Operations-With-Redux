import { GET_USERS, DELETE_USER, ADD_USER, UPDATE_USER } from "./actionType";
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

export const loadUsers = (take) => {
  return function (dispatch) {
    axios
      .get(`https://mes-backend.herokuapp.com/users`, {
        params: {
          skip: 0,
          take: 30,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        console.log("resp", resp);
        dispatch(getUsers(resp.data));
      })
      .catch((error) => console.log(error));
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
      .catch((error) => console.log(error));
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
      .catch((error) => console.log(error));
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
      .catch((error) => console.log(error));
  };
};
