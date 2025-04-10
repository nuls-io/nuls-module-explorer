/**
 * Created by zhoulijun on 2019-09-17.
 */
"use strict";
//Development mode
export const IS_DEV = process.env.NODE_ENV === 'production';
//Operating environment
export const RUN_DEV = false;
export const IS_BETA = true
//Request url
// export const API_ROOT = IS_DEV ? '/api' : 'http://beta.wallet.nuls.io/api';
export const API_ROOT = '/api';
// export const API_ROOT = 'http://192.168.1.60:8003/api';
//Contract authentication address
export const CODE_URL = 'https://beta.contract.nulscan.io';
//Request response time
export const API_TIME = '9000';
