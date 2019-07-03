const IS_DEV = process.env.NODE_ENV !== 'production';
//运行环境（true:正式环境，false:测试环境）
export const RUN_DEV = true;
//正式、测试网络的api
// const API_URL = RUN_DEV ?  : ;
//Request url
export const API_ROOT = IS_DEV ? 'http://127.0.0.1:1999/api/' : '/api/';
// export const API_ROOT = "/api/";
//Request response time
export const API_TIME = IS_DEV ? '9000' : '8000';

export const DEFAULT_CHAIN_ID = 2;
