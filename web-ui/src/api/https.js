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
export function post(url, methodName, data = {}, withoutChainId) {
  return new Promise((resolve, reject) => {
    if(methodName !=='getOtherChainInfo' && methodName !== 'getActiveAddressData'){
      data.unshift(Number(sessionStorage.getItem('chainId')));
    }
    if (methodName === "getSymbolInfo" || withoutChainId || methodName === "getTopAssets") {
      data.shift()
    }
    const params = {"jsonrpc": "2.0", "method": methodName, "params": data, "id": Math.floor(Math.random() * 1000)};
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
