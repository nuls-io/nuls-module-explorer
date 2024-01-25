package io.nuls.rpctools;

import io.nuls.base.RPCUtil;
import io.nuls.base.data.Transaction;
import io.nuls.core.core.annotation.Component;
import io.nuls.core.exception.NulsException;
import io.nuls.core.log.Log;
import io.nuls.core.rpc.info.Constants;
import io.nuls.core.rpc.model.ModuleE;
import io.nuls.rpctools.vo.TxRegisterDetail;

import java.io.IOException;
import java.util.*;
import java.util.function.Function;

/**
 * @Author: zhoulijun
 * @Time: 2019-06-12 17:57
 * @Description: Function Description
 */
@Component
public class TransactionTools implements CallRpc {


    /**
     * Initiate new transactions
     */
    public Boolean newTx(int chainId,Transaction tx) throws NulsException, IOException {
        Map<String, Object> params = new HashMap<>(2);
        params.put("chainId", chainId);
        params.put("tx", RPCUtil.encode(tx.serialize()));
        return callRpc(ModuleE.TX.abbr, "tx_newTx", params, res -> true);
    }

    /**
     * Register transactions with the trading module
     * Register transactions with the transaction module
     */
    public boolean registerTx(int chainId,String moduleName,int... txTyps) {
        try {
            List<TxRegisterDetail> txRegisterDetailList = new ArrayList<>();
            Arrays.stream(txTyps).forEach(txType->{
                TxRegisterDetail detail = new TxRegisterDetail();
                detail.setSystemTx(false);
                detail.setTxType(txType);
                detail.setUnlockTx(false);
                detail.setVerifySignature(true);
                detail.setVerifyFee(true);
                txRegisterDetailList.add(detail);
            });
            //Register transactions with the transaction management module
            Map<String, Object> params = new HashMap<>();
            params.put(Constants.VERSION_KEY_STR, "1.0");
            params.put(Constants.CHAIN_ID, chainId);
            params.put("moduleCode", moduleName);
            params.put("list", txRegisterDetailList);
            params.put("delList",List.of());
            return callRpc(ModuleE.TX.abbr, "tx_register", params,(Function<Map<String,Object>, Boolean>)  res -> (Boolean) res.get("value"));
        } catch (Exception e) {
            Log.error("", e);
        }
        return true;
    }

}
