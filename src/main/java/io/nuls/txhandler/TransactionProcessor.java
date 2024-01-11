package io.nuls.txhandler;

import io.nuls.base.data.BlockHeader;
import io.nuls.base.data.Transaction;

/**
 * @Author: zhoulijun
 * @Time: 2019-06-11 20:04
 * @Description: Function Description
 */
public interface TransactionProcessor {

    /**
     * Return transaction type
     * @return
     */
    int getType();

    /**
     * Verify Interface
     *
     * @param chainId       chainId
     * @param tx           Type is{@link #getType()}All transactions of
     * @param blockHeader   Block head
     * @return Unverified transactions,Need to discard
     */
    boolean validate(int chainId, Transaction tx, BlockHeader blockHeader);

    /**
     * Submit Interface
     *
     * @param chainId       chainId
     * @param tx           Type is{@link #getType()}All transaction sets for
     * @param blockHeader   Block head
     * @return Whether the submission was successful
     */
    boolean commit(int chainId, Transaction tx, BlockHeader blockHeader);

    /**
     * Rollback interface
     *
     * @param chainId       chainId
     * @param tx          Type is{@link #getType()}All transaction sets for
     * @param blockHeader   Block head
     * @return Is the rollback successful
     */
    boolean rollback(int chainId, Transaction tx, BlockHeader blockHeader);




}
