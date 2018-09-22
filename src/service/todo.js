import axios from './axios';
import * as url from '../apiUrl';

/**
 * todo 가져오기
 * @returns {Axios.Promise}
 */
export function getItem() {
  return axios.get(url.items());
}

/**
 * todo 추가하기
 * @param {object} todo - todo item
 * @returns {Axios.Promise}
 */
export function postItem(todo) {
  return axios.post(url.items(), todo);
}

/**
 * todo 삭제하기
 * @param {object} itemId - 지우고자 하는 itemId
 * @returns {Axios.Promise}
 */
export function deleteItem(itemId) {
  return axios.delete(url.itemsWithId(itemId));
}

/**
 * todo 완료상태 toggle 하기
 * @param {object} itemId - 지우고자 하는 itemId
 * @returns {Axios.Promise}
 */

export function toggleCompleteItem(itemId, isCompleted) {
  return axios.put(url.itemsWithId(itemId), {isCompleted: !isCompleted});
}

/**
 * todo 제목 변경하기
 * @param {object} itemId - 지우고자 하는 itemId
 * @returns {Axios.Promise}
 */

export function changeItemTitle(itemId, title) {
  return axios.put(url.itemsWithId(itemId), {title: title});
}
