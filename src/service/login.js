import axios from './axios';
import * as url from '../apiUrl';

/**
 * 로그인 후 accessToken 보내기
 * @param {object} accessToken - access token object
 * @returns {Axios.Promise}
 */
export function login(accessToken) {
  return axios.post(url.login(), accessToken);
}

export function logout() {
  return axios.post(url.logout());
}

export function fetchUserInfo() {
  return axios.get(url.fetchUserInfo());
}
