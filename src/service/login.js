import axios from './axios';
import * as url from '../apiUrl';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const SESSION_ID = cookies.get('SESSIONID');
const optionHeaders = {
  crossDomain: true,
  withCredentials: true,
  'Set-Cookie': `SESSIONID=${SESSION_ID};`
};

/**
 * 로그인 후 accessToken 보내기
 * @param {object} accessToken - access token object
 * @returns {Axios.Promise}
 */
export function login(accessToken) {
  return axios.post(url.login(), accessToken);
}

export function fetchUserInfo() {
  return axios.get(url.fetchUserInfo(), {headers: optionHeaders});
}
