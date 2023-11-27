import { BigNumber } from 'bignumber.js'
import copy from 'copy-to-clipboard'
import { RUN_DEV, IS_BETA } from '../config'
import axios from 'axios';
import { _networkInfo } from '@/api/heterogeneousChainConfig';
import i18n from '../i18n'
import { Message } from 'element-ui';

/**
 * 10的N 次方
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Power(arg) {
  let newPower = new BigNumber(10);
  return newPower.pow(arg);
}

/**
 * 减法
 * @param nu
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Minus(nu, arg) {
  let newMinus = new BigNumber(nu);
  return newMinus.minus(arg);
}

/**
 * 乘法
 * @param nu
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Times(nu, arg) {
  let newTimes = new BigNumber(nu);
  return newTimes.times(arg);
}

/**
 * 加法
 * @param nu
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Plus(nu, arg) {
  let newPlus = new BigNumber(nu);
  return newPlus.plus(arg);
}

/**
 * 除法
 * @param nu
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Division(nu, arg) {
  let newDiv = new BigNumber(nu);
  return newDiv.div(arg);
}

/**
 * 数字除以精度系数
 */
export function timesDecimals(nu, decimals = 8, reserve = 2) {
  let newDecimals = decimals ? decimals : Number(sessionStorage.getItem('decimals'));
  let newNu = new BigNumber(Division(nu, Power(newDecimals)).toString());
  return newNu.toFormat(reserve, 1).replace(/[,]/g, '');
}

/**
 * 旧
 * 数字除以精度系数
 */
export function divisionDecimals(nu, decimals = 8) {
  let newNu = new BigNumber(Division(nu, Power(decimals)).toString());
  return newNu.toFormat().replace(/[,]/g, '');
}
/**
 * 新
 * 数字除以精度系数
 */
//  export function divisionDecimals(nu, decimals = 8) {
//   // let newNu = new BigNumber(Division(nu, Power(decimals)).toString());
//   return new BigNumber(Division(nu, Power(decimals))).toFormat().replace(/[,]/g, '');
// }

/**
 * 数字乘以精度系数
 */
export function timesDecimals0(nu, decimals = 8) {
  let newNu = new BigNumber(Times(nu, Power(decimals)).toString());
  return Number(newNu);
}
//转千分位
export function toThousands(num = 0) {
  const N = num.toString().split('.')
  const int = N[0]
  const float = N[1] ? '.' + N[1] : ''
  return int.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + float;
}

/**
 * 超长数字显示
 * @param nu
 * @param powerNu
 * @returns {string}
 */
export function langNumber(nu, powerNu) {
  let newNu = new BigNumber(Division(nu, powerNu).toString());
  return newNu.toFormat().replace(/[,]/g, '');
}

/**
 * 字符串中间显示....
 * @param string
 * @param leng
 * @returns {*}
 */
export function superLong(string, leng) {
  if (string && string.length > 10) {
    return string.substr(0, leng) + "...." + string.substr(string.length - leng, string.length);
  } else {
    return string;
  }
}

/**
 * 复制 copy
 * @param value
 */
export const copys = (value) => copy(value);

/**
 * 计数时间差
 * @param dateBegin
 * @returns {{days: number, hours: number, minutes: number, seconds: number}}
 */
export function timeDifference(dateBegin) {
  let dateEnd = new Date();    //结束时间
  let newDate = dateEnd.getTime() - dateBegin;   //时间差的毫秒数
  let days = Math.floor(newDate / (24 * 3600 * 1000));//计算出相差天数
  let leave1 = newDate % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / (3600 * 1000));
  let leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000));
  let leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
  let seconds = Math.round(leave3 / 1000);
  return { days: days, hours: hours, minutes: minutes, seconds: seconds };
}

/**
 * 根据不同时区显示时间
 * @param time
 * @returns {*}
 */
export function getLocalTime(time) {
  if (typeof time !== 'number') return;
  let d = new Date();
  let offset = d.getTimezoneOffset() * 60000;
  let localUtc = new Date().getTimezoneOffset() / 60;
  let utcTime;
  if (localUtc > 0) {
    utcTime = time - offset;
  } else {
    utcTime = time + offset;
  }
  let localTime = utcTime + 3600000 * Math.abs(localUtc);
  return new Date(localTime);
}

export function getChainId() {
  let chainId = null
  if (sessionStorage.getItem('chainId')) {
    chainId = sessionStorage.getItem('chainId')
  } else {
    chainId = RUN_DEV ? 1 : 2;
  }

  return chainId
}

/**
 * 数字乘以精度系数(超长数字)
 *
 */
export function timesDecimalsBig(nu, decimals) {
  let newInfo = sessionStorage.hasOwnProperty('info') ? JSON.parse(sessionStorage.getItem('info')) : '';
  let newDecimals = decimals ? decimals : newInfo.defaultAsset.decimals;
  if (decimals === 0) {
    return nu
  }
  let fmt = { groupSeparator: '', };
  BigNumber.config({ FORMAT: fmt });
  let newNu = new BigNumber(Times(nu, Power(newDecimals)));
  return newNu.toFormat();
}

export function fixNumber(str, fix = 8) {
  str = '' + str;
  const int = str.split('.')[0];
  let float = str.split('.')[1];
  if (!float || !Number(float)) return int;
  float = float.slice(0, fix).replace(/(0+)$/g, '');
  return Number(float) ? int + '.' + float : int;
}

/**
 * 获取账户的余额及nonce
 * @param assetChainId
 * @param assetId
 * @param address
 * @returns {Promise<any>}
 */
export async function getNulsBalance(assetChainId = 2, assetId = 1, address) {
  const params = { "jsonrpc": "2.0", "method": 'getAccountBalance', "params": [Number(getChainId()), assetChainId, assetId, address], "id": Math.floor(Math.random() * 1000) };
  return await axios.post('/', params)
    .then((response) => {
      if (response.data.hasOwnProperty("result")) {
        return { success: true, data: { balance: response.data.result.balance, nonce: response.data.result.nonce } }
      } else {
        return { success: false, data: response.data }
      }
    })
    .catch((error) => {
      return { success: false, data: error };
    });
}

/**
 * 获取主网最新高度和本地高度
 */
export async function getHeaderInfo() {
  const params = {
    "jsonrpc": "2.0", "method": "getInfo", "params": [Number(getChainId())], "id": Math.floor(Math.random() * 1000)
  };
  await axios.post('/', params)
    .then((response) => {
      if (response.data.hasOwnProperty("result")) {
        sessionStorage.setItem("info", JSON.stringify(response.data.result));
      } else {
        sessionStorage.removeItem("info")
      }
    })
    .catch((error) => {
      console.log(error)
      sessionStorage.removeItem("info");
    })
}

/**
 * 获取参数的必填值
 * @param parameterList
 * @returns {{allParameter: boolean, args: Array}}
 */
export function getArgs(parameterList) {
  //console.log(parameterList);
  let newArgs = [];
  let allParameter = false;
  if (parameterList.length !== 0) {
    //循环获取必填参数
    for (let itme of parameterList) {
      if (itme.required) {
        if (itme.value) {
          allParameter = true;
          newArgs.push(itme.value)
        } else {
          return { allParameter: false, args: newArgs };
        }
      } else {
        allParameter = true;
        if (!itme.value) {
          newArgs.push('')
        } else {
          newArgs.push(itme.value)
        }
      }
    }
    return { allParameter: allParameter, args: newArgs };
  } else {
    return { allParameter: true, args: newArgs };
  }
}

export const isBeta = IS_BETA
/**
 * @desc 通过异构链id/注册id(nerve、nuls)，获取链名称
 * @param heterogeneousChainId 异构链id
 * @param assetChainId 资产id
 */
export function getOriginChain(heterogeneousChainId, assetChainId) {
  const chainsInfo = Object.values(_networkInfo);
  let chainName = '';
  if (heterogeneousChainId !== 0) {
    chainName = chainsInfo.find(v => v.chainId === heterogeneousChainId)?.name;
  } else {
    if (!assetChainId) return 'NULS';
    const NerveChainId = isBeta ? 5 : 9;
    chainName = NerveChainId === assetChainId ? 'NERVE' : 'NULS';
  }
  return chainName;
}

export async function Copy(val) {
  const locale = i18n._vm.locale
  let target = document.createElement('input') //创建input节点
  target.value = val // 给input的value赋值
  target.style.position = 'absolute'
  target.style.top = '-99999px'
  document.body.appendChild(target) // 向页面插入input节点
  target.select() // 选中input
  try {
    await document.execCommand('Copy') // 执行浏览器复制命令
    if(locale === 'cn'){
      Message({
        type: 'success',
        message: '复制成功'
      })
    }else{
      Message({
        type: 'success',
        message: 'Copied successfully'
      })
    }
  } catch {
    if(locale === 'cn'){
      Message({
        type: 'error',
        message: '您的浏览器不支持复制'
      })
    }else{
      Message({
        type: 'error',
        message: 'Your browser does not support copying'
      })
    }
  }
}
