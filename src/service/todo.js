import axios from './axios';
import * as url from '../apiUrl';

/**
 * 결제수단 변경 팝업 URL 가져오기
 * @param {string} contractId - 계약 id
 * @returns {Axios.Promise}
 */
export function test() {
  return axios.get(url.axiosTest());
}
