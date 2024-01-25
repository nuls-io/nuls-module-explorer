/**
 * @disc: Chain factory specific configuration
 * @date: 2020-02-14 14:04
 * @author: Wave
 */
"use strict";

//Development mode
export const IS_DEV = process.env.NODE_ENV === 'production';
//Operating environment
export const RUN_DEV = true;
//Request url
export const API_ROOT = IS_DEV ? '/api' : '/';
//Contract authentication address
export const CODE_URL = '';
//Request response time
export const API_TIME = '8000';
