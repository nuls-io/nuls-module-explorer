import {fetch, post, put} from './https'
//account
/**
 * Query account assets Get account assets
 * @param address
 * @param pageNumber
 * @param pageSize
 * @returns {Promise}
 */
export const getAccountAssets = (address,pageNumber,pageSize) => fetch('/account/assets/' +address+'?pageNumber='+pageNumber+'&pageSize='+pageSize);

/**
 * Query account private key Query the private key of the account
 * @param address
 * @returns {Promise}
 */
export const postAccountKey = (address) => post('/account/prikey/' + address);

/**
 * Obtain alias setting procedures Get the formalities for setting alias
 * @param address
 * @returns {Promise}
 */
export const getFeeAlias = (params) => fetch('/account/alias/fee?' + params);

/**
 *  Query account list Get account list
 * @param address
 * @param params
 * @returns {Promise}
 */
export const getAccountList = () => fetch('/account');

/**
 * Create an account New account
 * @param params
 * @returns {Promise}
 */
export const postAccount = (params) => post('/account', params);

/**
 *  Remove account Remove account
 * @param address
 * @returns {Promise}
 */
export const postAccountRemove = (address,params) => post('/account/remove/'+ address,params);

/**
 * according toKeyStoreImport account Import keystore account
 * @param params
 * @returns {Promise}
 */
export const postImportKeystore = (params) => post('/account/import', params);

/**
 * Set alias Set alias
 * @param address
 * @param params
 * @returns {Promise}
 */
export const postSetAlias = (address,params) => post('/account/alias/'+address, params);

/**
 * Import account based on private key Import key
 * @param params
 * @returns {Promise}
 */
export const postImportKey = (params) => post('/account/import/pri', params);

/**
 * [export] exportKeyStore Expot keystore
 * @param address
 * @param params
 * @returns {Promise}
 */
export const postExportKeystore = (address,params) => post('/account/export/'+address, params);

/**
 *  Query account information Get account info
 * @param address
 * @returns {Promise}
 */
export const getAccountInfo = (address) => fetch('/account/'+address);

/**
 *  Set account password Set password
 * @param address
 * @param params
 * @returns {Promise}
 */
export const postSetPassword = (address,params) => post('/account/export/'+address, params);

/**
 * Change account password Edit password
 * @param address
 * @param params
 * @returns {Promise}
 */
export const putEditPassword = (address,params) => put('/account/password/'+address, params);

/**
 * Verify account password Validation password
 * @param address
 * @param params
 * @returns {Promise}
 */
export const postValidationPassword = (address,params) => fetch('/account/password/validation/'+address, params);

//accountledger
/**
 * Query account balance Get account balance
 * @param address
 * @returns {Promise}
 */
export const getBalance = (address) => fetch('/accountledger/balance/'+address);

/**
 * Transfer Transfer
 * @param address
 * @param params
 * @returns {Promise}
 */
export const postTransfer = (params) => post('/accountledger/transfer', params);

/**
 * Transfer handling fee Get Transfer fee
 * @param params
 * @returns {Promise}
 */
export const getTransferFee = (params) => fetch('/accountledger/transfer/fee'+params);

/**
 * according tohashQuery transactions Get hash info
 * @param hash
 * @returns {Promise}
 */
export const getHashInfo = (hash) => fetch('/accountledger/tx/'+hash);

/**
 * Query user frozen list Get account lock list
 * @param address
 * @param params
 * @returns {Promise}
 */
export const getLockList = (address,params) => fetch('/accountledger/utxo/lock/' + address,params);

/**
 * Obtain user transaction list based on user address Get account Txlist a address
 * @param address
 * @param params
 * @returns {Promise}
 */
//export const getAccountTxList = (address,params) => fetch('/accountledger/tx/list/' + address,params);
export const getAccountTxList = (address,params) => fetch('/accountledger/tx/list/'+address+params);


//client
/**
 * Restart the system Restart
 * @param params
 * @returns {Promise}
 */
export const postRestart = () => post('/client/restart');

/**
 * Stop upgrading Stop upgrading
 * @returns {Promise}
 */
export const postUpgradeStop = () => post('/client/upgrade/stop');

/**
 * upgrade Upgrade
 * @param version
 * @returns {Promise}
 */
export const postUpgrade = (version) => post('/client/upgrade/'+version);

/**
 * Query system version information Get version info
 * @returns {Promise}
 */
export const getVersion = () => fetch('/client/version');

/**
 * Query upgrade progress Get version speed
 * @returns {Promise}
 */
export const getVersioning = () => fetch('/client/upgrade');


//consensus
/**
 * Obtaining transaction fees for joining consensus Post the fee of create agent
 * @param params
 * @returns {Promise}
 */
export const getDepositFee = (params) => fetch('/consensus/deposit/fee',params);

/**
 * Apply to participate in consensus Deposit nuls to a bank!
 * @param params
 * @returns {Promise}
 */
export const postDeposit = (params) => post('/consensus/deposit',params);

/**
 * Query the list of all delegation information participating in the specified address  Get accont deposit list
 * @param address
 * @param params
 * @returns {Promise}
 */
export const getDepositList = (address,params) => fetch('/consensus/deposit/address/'+address,params);

/**
 * Query consensus node entrusted list information Get agent deposit list
 * @param agentHash
 * @param params
 * @returns {Promise}
 */
export const getDepositAgentList = (agentHash,params) => fetch('/consensus/deposit/agent/'+agentHash,params);

/**
 * Unregister consensus node Post agent stop
 * @param params
 * @returns {Promise}
 */
export const postAgentStop = (params) => post('/consensus/agent/stop',params);

/**
 * Create consensus nodes Create an agent for consensus
 * @param params
 * @returns {Promise}
 */
export const postAgent = (params) => post('/consensus/agent',params);

/**
 * Query consensus node list information Get agent list
 * @param params
 * @returns {Promise}
 */
export const getAgentList = (params) => fetch('/consensus/agent/list',params);

/**
 * Exit consensus Post withdraw
 * @param params
 * @returns {Promise}
 */
export const postWithdraw = (params) => post('/consensus/withdraw',params);

/**
 * Query the overall consensus information of the entire network  Get the whole network consensus infomation
 * @returns {Promise}
 */
export const getConsensus = () => fetch('/consensus');

/**
 * Query the list of delegated node information based on the address Get entrust list a address
 * @param address
 * @param params
 * @returns {Promise}
 */
export const getEntrustAgentList = (address,params) => fetch('/consensus/agent/address/'+address,params);

/**
 * Obtain consensus information for an account participation Get address agent info
 * @param address
 * @returns {Promise}
 */
export const getAddressAgentList = (address) => fetch('/consensus/address/'+address);

/**
 * Obtain the transaction fee for stopping the node Get the fee of stop agent!
 * @param params
 * @returns {Promise}
 */
export const getAgentStopFee = (params) => fetch('/consensus/agent/stop/fee',params);

/**
 * Query consensus node details Get agentHash info
 * @param agentHash
 * @returns {Promise}
 */
export const getAgentHashInfo = (agentHash) => fetch('/consensus/agent/'+agentHash);

/**
 * Obtain the handling fee for revoking the commission Get the fee of cancel deposit!
 * @param params
 * @returns {Promise}
 */
export const getWithdrawFee = (params) => fetch('/consensus/withdraw/fee',params);

/**
 * Obtain node creation transaction fees Get the fee of create agent!
 * @param params
 * @returns {Promise}
 */
export const getAgentFee = (params) => fetch('/consensus/withdraw/fee',params);


//sys
/**
 * Set System Language Put sys language
 * @param language
 * @returns {Promise}
 */
export const putSetLanguage = (language) => put('/sys/lang/'+language);


//transaction
/**
 * according tohashQuery transactions Get hash info
 * @param hash
 * @returns {Promise}
 */
export const getHashInfos= (hash) => fetch('/accountledger/tx/'+hash);


//network
/**
 * Search for the latest information on the internet Get network info
 * @returns {Promise}
 */
export const getNetworkInfo= () => fetch('/network/info');

/**
 * Query nodesIP  Get network ip
 * @returns {Promise}
 */
export const getNetworkIp= () => fetch('/network/nodes');


