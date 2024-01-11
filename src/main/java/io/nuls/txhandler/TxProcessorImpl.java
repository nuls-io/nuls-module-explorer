package io.nuls.txhandler;

import io.nuls.base.data.BlockHeader;
import io.nuls.base.data.Transaction;
import io.nuls.core.core.annotation.Component;
import io.nuls.core.log.Log;

@Component
public class TxProcessorImpl implements TransactionProcessor {


    @Override
    public int getType() {
        return 0;
    }

    @Override
    public boolean validate(int chainId, Transaction tx, BlockHeader blockHeader) {
        Log.debug("validate tx", tx.getTxData());
        //todo Verify transaction business data
        return true;
    }

    @Override
    public boolean commit(int chainId, Transaction tx, BlockHeader blockHeader) {
        Log.info("commit tx");
        //todo Save transaction business data
        return true;
    }

    @Override
    public boolean rollback(int chainId, Transaction tx, BlockHeader blockHeader) {
        Log.info("rollback tx");
        //todo Rollback transaction business data
        return true;
    }
}
