/**
 * Created by zhoulijun on 2019-09-17.
 */
"use strict";

//开发模式
export const IS_DEV = process.env.NODE_ENV === 'production';
//运行环境
export const RUN_DEV = true;
//Request url
export const API_ROOT = IS_DEV ? '/api' : 'http://wallet.bbai.io:8004';
//合约认证地址
export const CODE_URL = 'http://47.111.179.183:8020';
//Request response time
export const API_TIME = '8000';
