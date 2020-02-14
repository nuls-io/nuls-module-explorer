/**
 * @disc: 链工厂专用配置
 * @date: 2020-02-14 14:04
 * @author: Wave
 */
"use strict";

//开发模式
export const IS_DEV = process.env.NODE_ENV === 'production';
//运行环境
export const RUN_DEV = true;
//Request url
export const API_ROOT = IS_DEV ? '/api' : '/';
//合约认证地址
export const CODE_URL = '';
//Request response time
export const API_TIME = '8000';
