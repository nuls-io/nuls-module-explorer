import axios from 'axios'
import * as config from '../config.js'

axios.defaults.timeout = config.API_TIME;
axios.defaults.baseURL = config.API_ROOT;
axios.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * 封装post请求
 * Encapsulation post method
 * @param url
 * @param methodName
 * @param data
 * @returns {Promise}
 */
export function post(url, methodName, data = {}) {
  return new Promise((resolve, reject) => {
    data.unshift(Number(sessionStorage.getItem('chainId')));
    const params = {"jsonrpc": "2.0", "method": methodName, "params": data, "id": Math.floor(Math.random() * 1000)};
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
