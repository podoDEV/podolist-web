import Cookies from 'universal-cookie';
import axios from './axios';
import * as url from '../apiUrl';

const cookies = new Cookies();
const SESSION_ID = cookies.get('SESSIONID');
const optionHeaders = {
  withCredentials: true,
  'Set-Cookie': `SESSIONID=${SESSION_ID};`
};

/**
 * 전체 todo 가져오기
 * @param {string} date - date
 * @returns {Axios.Promise}
 */
export function getItemList(date) {
  return axios.get(url.fetchItems(date), {headers: optionHeaders});
}

/**
 * todo 추가하기
 * @param {object} todo - todo item
 * @returns {Axios.Promise}
 */
export function createItem(todo) {
  return axios.post(url.items(), todo, {headers: optionHeaders});
}

/**
 * todo 삭제하기
 * @param {object} itemId - 지우고자 하는 itemId
 * @returns {Axios.Promise}
 */
export function deleteItem(itemId) {
  return axios.delete(url.itemsWithId(itemId), {headers: optionHeaders});
}

/**
 * todo isCompleted 토글
 * @param {number} itemId - 업데이트 하고자 하는 아이템의 아이디
 * @param {boolean} isCompleted - 완료여부
 * @returns {Axios.Promise}
 */
export function toggleIsCompletedItem(itemId, isCompleted) {
  return axios.put(url.itemsWithId(itemId), {isCompleted: !isCompleted}, {headers: optionHeaders});
}

/**
 * todo 업데이트
 * @param {number} itemId - 업데이트 하고자 하는 아이템의 아이디
 * @param {object} todo - todo
 * @returns {Axios.Promise}
 */
export function updateItem(itemId, todo) {
  return axios.put(url.itemsWithId(itemId), todo, {headers: optionHeaders});
}
