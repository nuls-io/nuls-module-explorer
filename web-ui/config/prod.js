/**
 * Created by zhoulijun on 2019-09-17.
 */
"use strict";

//开发模式
export const IS_DEV = process.env.NODE_ENV === 'production';
//运行环境
export const RUN_DEV = true;
//Request url
export const API_ROOT = IS_DEV ? '/api' : 'https://public1.nuls.io';
//合约认证地址
export const CODE_URL = 'https://nulscan.io/validation_contract';
//Request response time
export const API_TIME = '8000';
