import {
  USER_SIGNUP_BEGIN,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_LOGIN_BEGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  LOGGED_IN
} from "./types";
import axios from "axios";

const apiUrl = "https://hng5-whisper.herokuapp.com/api/v1/auth";

export const addUserBegin = () => ({
  type: USER_SIGNUP_BEGIN
});

export const addUserSuccess = data => ({
  type: USER_SIGNUP_SUCCESS,
  payload: {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    password: data.password,
    role: data.role
  }
});

export const addUserFailure = error => ({
  type: USER_SIGNUP_FAILURE,
  payload: { error }
});

export const userLoginBegin = () => ({
  type: USER_LOGIN_BEGIN
});

export const userLoginSuccess = data => ({
  type: USER_LOGIN_SUCCESS,
  payload: {
    email: data.email,
    password: data.password,
    userId: data.user._id
  }
});

export const userLoginFailure = error => ({
  type: USER_LOGIN_FAILURE,
  payload: { error }
});

export const loggedIn = id => ({
  type: LOGGED_IN,
  payload: {
    user: id
  }
});

export function fetchUser(id) {
  return dispatch => {
    axios
      .get(`${apiUrl}/${id}`)
      .then(response => {
        dispatch(loggedIn(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function userLogin({ username, password }) {
  return dispatch => {
    dispatch(userLoginBegin());
    axios
      .post(`${apiUrl}/login`, { username, password })
      .then(response => {
        localStorage.setItem("token", response.data.data.token);
        dispatch(userLoginSuccess(response.data));
      })
      .catch(error => {
        dispatch(userLoginFailure(error));
      });
  };
}

export function signUp({
  first_name,
  last_name,
  email,
  password,
  designation
}) {
  return dispatch => {
    dispatch(addUserBegin());
    axios
      .post(`${apiUrl}/signup`, {
        first_name,
        last_name,
        email,
        password,
        designation
      })
      .then(response => {
        localStorage.setItem("token", response.data.data.token);
        dispatch(addUserSuccess(response.data));
      })
      .catch(error => {
        dispatch(addUserFailure(error));
      });
  };
}
