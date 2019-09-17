import {fetch, post, put} from './https'
//account
/**
 * 查询账户资产 Get account assets
 * @param address
 * @param pageNumber
 * @param pageSize
 * @returns {Promise}
 */
export const getAccountAssets = (address,pageNumber,pageSize) => fetch('/account/assets/' +address+'?pageNumber='+pageNumber+'&pageSize='+pageSize);

/**
 * 查询账户私钥 Query the private key of the account
 * @param address
 * @returns {Promise}
 */
export const postAccountKey = (address) => post('/account/prikey/' + address);

/**
 * 获取设置别名手续 Get the formalities for setting alias
 * @param address
 * @returns {Promise}
 */
export const getFeeAlias = (params) => fetch('/account/alias/fee?' + params);

/**
 *  查询账户列表 Get account list
 * @param address
 * @param params
 * @returns {Promise}
 */
export const getAccountList = () => fetch('/account');

/**
 * 创建账户 New account
 * @param params
 * @returns {Promise}
 */
export const postAccount = (params) => post('/account', params);

/**
 *  移除账户 Remove account
 * @param address
 * @returns {Promise}
 */
export const postAccountRemove = (address,params) => post('/account/remove/'+ address,params);

/**
 * 根据KeyStore导入账户 Import keystore account
 * @param params
 * @returns {Promise}
 */
export const postImportKeystore = (params) => post('/account/import', params);

/**
 * 设置别名 Set alias
 * @param address
 * @param params
 * @returns {Promise}
 */
export const postSetAlias = (address,params) => post('/account/alias/'+address, params);

/**
 * 根据私钥导入账户 Import key
 * @param params
 * @returns {Promise}
 */
export const postImportKey = (params) => post('/account/import/pri', params);

/**
 * [导出] 导出KeyStore Expot keystore
 * @param address
 * @param params
 * @returns {Promise}
 */
export const postExportKeystore = (address,params) => post('/account/export/'+address, params);

/**
 *  查询账户信息 Get account info
 * @param address
 * @returns {Promise}
 */
export const getAccountInfo = (address) => fetch('/account/'+address);

/**
 *  设置账户密码 Set password
 * @param address
 * @param params
 * @returns {Promise}
 */
export const postSetPassword = (address,params) => post('/account/export/'+address, params);

/**
 * 修改账户密码 Edit password
 * @param address
 * @param params
 * @returns {Promise}
 */
export const putEditPassword = (address,params) => put('/account/password/'+address, params);

/**
 * 验证账户密码 Validation password
 * @param address
 * @param params
 * @returns {Promise}
 */
export const postValidationPassword = (address,params) => fetch('/account/password/validation/'+address, params);

//accountledger
/**
 * 查询账户余额 Get account balance
 * @param address
 * @returns {Promise}
 */
export const getBalance = (address) => fetch('/accountledger/balance/'+address);

/**
 * 转账 Transfer
 * @param address
 * @param params
 * @returns {Promise}
 */
export const postTransfer = (params) => post('/accountledger/transfer', params);

/**
 * 转账手续费 Get Transfer fee
 * @param params
 * @returns {Promise}
 */
export const getTransferFee = (params) => fetch('/accountledger/transfer/fee'+params);

/**
 * 根据hash查询交易 Get hash info
 * @param hash
 * @returns {Promise}
 */
export const getHashInfo = (hash) => fetch('/accountledger/tx/'+hash);

/**
 * 查询用户冻结列表 Get account lock list
 * @param address
 * @param params
 * @returns {Promise}
 */
export const getLockList = (address,params) => fetch('/accountledger/utxo/lock/' + address,params);

/**
 * 根据用户地址获取用户交易列表 Get account Txlist a address
 * @param address
 * @param params
 * @returns {Promise}
 */
//export const getAccountTxList = (address,params) => fetch('/accountledger/tx/list/' + address,params);
export const getAccountTxList = (address,params) => fetch('/accountledger/tx/list/'+address+params);


//client
/**
 * 重启系统 Restart
 * @param params
 * @returns {Promise}
 */
export const postRestart = () => post('/client/restart');

/**
 * 停止升级 Stop upgrading
 * @returns {Promise}
 */
export const postUpgradeStop = () => post('/client/upgrade/stop');

/**
 * 升级 Upgrade
 * @param version
 * @returns {Promise}
 */
export const postUpgrade = (version) => post('/client/upgrade/'+version);

/**
 * 查询系统版本信息 Get version info
 * @returns {Promise}
 */
export const getVersion = () => fetch('/client/version');

/**
 * 查询升级进度 Get version speed
 * @returns {Promise}
 */
export const getVersioning = () => fetch('/client/upgrade');


//consensus
/**
 * 获取加入共识的手续费 Post the fee of create agent
 * @param params
 * @returns {Promise}
 */
export const getDepositFee = (params) => fetch('/consensus/deposit/fee',params);

/**
 * 申请参与共识 Deposit nuls to a bank!
 * @param params
 * @returns {Promise}
 */
export const postDeposit = (params) => post('/consensus/deposit',params);

/**
 * 查询指定地址参与的所有委托信息列表  Get accont deposit list
 * @param address
 * @param params
 * @returns {Promise}
 */
export const getDepositList = (address,params) => fetch('/consensus/deposit/address/'+address,params);

/**
 * 查询共识节点受托列表信息 Get agent deposit list
 * @param agentHash
 * @param params
 * @returns {Promise}
 */
export const getDepositAgentList = (agentHash,params) => fetch('/consensus/deposit/agent/'+agentHash,params);

/**
 * 注销共识节点 Post agent stop
 * @param params
 * @returns {Promise}
 */
export const postAgentStop = (params) => post('/consensus/agent/stop',params);

/**
 * 创建共识节点 Create an agent for consensus
 * @param params
 * @returns {Promise}
 */
export const postAgent = (params) => post('/consensus/agent',params);

/**
 * 查询共识节点列表信息 Get agent list
 * @param params
 * @returns {Promise}
 */
export const getAgentList = (params) => fetch('/consensus/agent/list',params);

/**
 * 退出共识 Post withdraw
 * @param params
 * @returns {Promise}
 */
export const postWithdraw = (params) => post('/consensus/withdraw',params);

/**
 * 查询全网共识总体信息  Get the whole network consensus infomation
 * @returns {Promise}
 */
export const getConsensus = () => fetch('/consensus');

/**
 * 根据地址查询其委托的节点信息列表 Get entrust list a address
 * @param address
 * @param params
 * @returns {Promise}
 */
export const getEntrustAgentList = (address,params) => fetch('/consensus/agent/address/'+address,params);

/**
 * 获取某个账户参与共识信息 Get address agent info
 * @param address
 * @returns {Promise}
 */
export const getAddressAgentList = (address) => fetch('/consensus/address/'+address);

/**
 * 获取停止节点的手续费 Get the fee of stop agent!
 * @param params
 * @returns {Promise}
 */
export const getAgentStopFee = (params) => fetch('/consensus/agent/stop/fee',params);

/**
 * 查询共识节点详细信息 Get agentHash info
 * @param agentHash
 * @returns {Promise}
 */
export const getAgentHashInfo = (agentHash) => fetch('/consensus/agent/'+agentHash);

/**
 * 获取撤销委托的手续费 Get the fee of cancel deposit!
 * @param params
 * @returns {Promise}
 */
export const getWithdrawFee = (params) => fetch('/consensus/withdraw/fee',params);

/**
 * 获取创建节点手续费 Get the fee of create agent!
 * @param params
 * @returns {Promise}
 */
export const getAgentFee = (params) => fetch('/consensus/withdraw/fee',params);


//sys
/**
 * 设置系统语言 Put sys language
 * @param language
 * @returns {Promise}
 */
export const putSetLanguage = (language) => put('/sys/lang/'+language);


//transaction
/**
 * 根据hash查询交易 Get hash info
 * @param hash
 * @returns {Promise}
 */
export const getHashInfos= (hash) => fetch('/accountledger/tx/'+hash);


//network
/**
 * 查询网络最新信息 Get network info
 * @returns {Promise}
 */
export const getNetworkInfo= () => fetch('/network/info');

/**
 * 查询节点IP  Get network ip
 * @returns {Promise}
 */
export const getNetworkIp= () => fetch('/network/nodes');


