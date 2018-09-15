/**
 * @fileoverview 각 API별 axios 인스턴스
 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
 */

import rawAxios from 'axios';

// Default axios
const axios = rawAxios.create({
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*'
  }
});
// addDummyParam(axios);

export default axios;

/**
 * 캐시 방지용 더미 파라메타 추가
 * @param {AxiosInstance} axiosInstance - Axios 인스턴스
 */
// function addDummyParam(axiosInstance) {
//   axiosInstance.interceptors.request.use((config) => {
//     config.params = Object.assign({}, config.params, {_: String(Date.now())});
//     return config;
//   });
// }
