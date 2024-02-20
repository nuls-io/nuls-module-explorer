/**
 * Created by zhoulijun on 2019-09-17.
 */
"use strict";

//Development mode
export const IS_DEV = process.env.NODE_ENV === 'production';
//Operating environment
export const RUN_DEV = true;
export const IS_BETA = false;
//Request url
export const API_ROOT = IS_DEV ? '/api' : 'https://public1.nuls.io';
// export const API_ROOT = IS_DEV ? '/api' : 'https://beta.public1.nuls.io/jsonrpc';
//Contract authentication address
export const CODE_URL = 'https://nulscan.io/validation_contract';
// export const CODE_URL = 'https://beta.contract.nulscan.io'; //Submitting code requires deletion
//Request response time
export const API_TIME = '8000';
