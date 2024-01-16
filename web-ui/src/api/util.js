import { BigNumber } from 'bignumber.js'
import copy from 'copy-to-clipboard'
import { RUN_DEV, IS_BETA } from '../config'
import axios from 'axios';
import { _networkInfo } from '@/api/heterogeneousChainConfig';
import i18n from '../i18n'
import { Message } from 'element-ui';

/**
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Power(arg) {
  let newPower = new BigNumber(10);
  return newPower.pow(arg);
}

/**
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
 * @param nu
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Division(nu, arg) {
  let newDiv = new BigNumber(nu);
  return newDiv.div(arg);
}

export function timesDecimals(nu, decimals = 8, reserve) {
  // let newDecimals = decimals ? decimals : Number(sessionStorage.getItem('decimals'));
  let newDecimals = decimals;
  let newNu = new BigNumber(Division(nu, Power(newDecimals)).toString());
  if (reserve) {
    return newNu.toFormat(reserve, 1).replace(/[,]/g, '');
  } else {
    return newNu.toFormat().replace(/[,]/g, '');
  }
}


export function divisionDecimals(nu, decimals = 8) {
  let newNu = new BigNumber(Division(nu, Power(decimals)).toString());
  return newNu.toFormat().replace(/[,]/g, '');
}

export function timesDecimals0(nu, decimals = 8) {
  let newNu = new BigNumber(Times(nu, Power(decimals)).toString());
  return Number(newNu);
}

export function toThousands(num = 0) {
  if(Number(num) > 0){
    const N = num.toString().split('.')
    const int = N[0]
    const float = N[1] ? '.' + N[1] : ''
    return int.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + float;
  } else  {
    return '0'
  }
}


export function langNumber(nu, powerNu) {
  let newNu = new BigNumber(Division(nu, powerNu).toString());
  return newNu.toFormat().replace(/[,]/g, '');
}


export function superLong(string, leng) {
  if (string && string.length > 10) {
    return string.substr(0, leng) + "...." + string.substr(string.length - leng, string.length);
  } else {
    return string;
  }
}

// export const copys = (value) => copy(value);
export function copys (value) {
  copy(value)
}

/**
 * @param dateBegin
 * @returns {{days: number, hours: number, minutes: number, seconds: number}}
 */
export function timeDifference(dateBegin) {
  let dateEnd = new Date();
  let newDate = dateEnd.getTime() - dateBegin;
  let days = Math.floor(newDate / (24 * 3600 * 1000));
  let leave1 = newDate % (24 * 3600 * 1000); 
  let hours = Math.floor(leave1 / (3600 * 1000));
  let leave2 = leave1 % (3600 * 1000);
  let minutes = Math.floor(leave2 / (60 * 1000));
  let leave3 = leave2 % (60 * 1000); 
  let seconds = Math.round(leave3 / 1000);
  return { days: days, hours: hours, minutes: minutes, seconds: seconds };
}

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
 * @param parameterList
 * @returns {{allParameter: boolean, args: Array}}
 */
export function getArgs(parameterList) {
  //console.log(parameterList);
  let newArgs = [];
  let allParameter = false;
  if (parameterList.length !== 0) {
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
 * @param heterogeneousChainId
 * @param assetChainId
 */
export function getOriginChain(heterogeneousChainId, assetChainId) {
  const chainsInfo = Object.values(_networkInfo);
  let chainName = '';
  if (heterogeneousChainId !== 0) {
    chainName = chainsInfo.find(v => v.sourceChainId === heterogeneousChainId)?.name;
  } else {
    if (!assetChainId) return 'NULS';
    const NerveChainId = isBeta ? 5 : 9;
    chainName = NerveChainId === assetChainId ? 'NERVE' : 'NULS';
  }
  return chainName;
}


export function titleCase(str) {
  if(str){
    var newarr, newarr1 = [];
    newarr = str.toLowerCase().split(" ");
    for (var i = 0; i < newarr.length; i++) {
      newarr1.push(newarr[i][0].toUpperCase() + newarr[i].substring(1));
    }
    return newarr1.join(' ');
  }
}

export async function Copy(val) {
  const locale = i18n._vm.locale
  let target = document.createElement('input') //establishinputnode
  target.value = val // toinputofvalueassignment
  target.style.position = 'absolute'
  target.style.top = '-99999px'
  document.body.appendChild(target) // Insert into pageinputnode
  target.select() // Selectinput
  try {
    await document.execCommand('Copy') // Execute browser copy command
    if (locale === 'cn') {
      Message({
        offset: 90,
        type: 'success',
        message: 'Copy successful'
      })
    } else {
      Message({
        offset: 90,
        type: 'success',
        message: 'Copied successfully'
      })
    }
  } catch {
    if (locale === 'cn') {
      Message({
        offset: 90,
        type: 'error',
        message: 'Your browser does not support copying'
      })
    } else {
      Message({
        offset: 90,
        type: 'error',
        message: 'Your browser does not support copying'
      })
    }
  }
}
