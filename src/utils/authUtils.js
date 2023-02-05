import { createBrowserHistory } from "@remix-run/router";
import cookies from "js-cookie";
import { shallow } from "zustand/shallow";
import useAuthStore from "../stores/useAuthStore";
const ACCESS_TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const setCookie = (key, value, option = {}) =>
  cookies.set(key, value, option);

export const getCookie = (key, option = {}) => cookies.get(key, option);

export const getAccessToken = (option = {}) =>
  getCookie(ACCESS_TOKEN_KEY, option);

// export const getRefreshToken = (option = {}) =>
//   getCookie(REFRESH_TOKEN_KEY, option);

export const setAccessToken = (value = "", option) =>
  setCookie(ACCESS_TOKEN_KEY, value, option);

// export const setRefreshToken = (value = "", option) =>
//   setCookie(REFRESH_TOKEN_KEY, value, option);

const removeCookie = (key, option) => cookies.remove(key, option);
export const removeAccessToken = (option = {}) =>
  removeCookie(ACCESS_TOKEN_KEY, option);

// export const removeRefreshToken = (option = {}) =>
//   removeCookie(REFRESH_TOKEN_KEY, option);

export const isLoggedIn = () => {
  const idToken = getAccessToken();
  return !!idToken;
};

export const logout = () => {
  useAuthStore.getState().setIsSignedIn(false);
  useAuthStore.getState().setCurrentUser(null);
  removeAccessToken();
  createBrowserHistory().push("/login");
  window.location.reload();
};
