package io.nuls;

import io.nuls.base.data.Transaction;
import io.nuls.base.signture.P2PHKSignature;
import io.nuls.base.signture.SignatureUtil;
import io.nuls.base.signture.TransactionSignature;
import io.nuls.core.constant.CommonCodeConstanst;
import io.nuls.core.crypto.AESEncrypt;
import io.nuls.core.crypto.ECKey;
import io.nuls.core.crypto.HexUtil;
import io.nuls.core.exception.CryptoException;
import io.nuls.core.exception.NulsRuntimeException;
import io.nuls.core.model.ObjectUtils;

import java.io.IOException;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @Author: zhoulijun
 * @Time: 2019-06-20 17:48
 */
public class Utils {

    /**
     * Sign the transaction and pass the signature into the transaction
     * @param transaction
     * @param priKey
     * @param pubKey
     * @param password
     * @return
     * @throws IOException
     */
    public static Transaction signTransaction(Transaction transaction, String priKey,String pubKey, String password) throws IOException {
        TransactionSignature transactionSignature = new TransactionSignature();
        List<P2PHKSignature> p2PHKSignatures = new ArrayList<>();
        ECKey eckey = null;
        byte[] unencryptedPrivateKey;
        //Check if there is a private key in the current account. If there is no private key, it is an encrypted account
        BigInteger newPriv = null;
        ObjectUtils.canNotEmpty(password, "the password can not be empty");
        try {
            unencryptedPrivateKey = AESEncrypt.decrypt(HexUtil.decode(priKey), password);
            newPriv = new BigInteger(1, unencryptedPrivateKey);
        } catch (CryptoException e) {
            throw new NulsRuntimeException(CommonCodeConstanst.FAILED,"password is wrong");
        }
        eckey = ECKey.fromPrivate(newPriv);
        if (!Arrays.equals(eckey.getPubKey(), HexUtil.decode(pubKey))) {
            throw new NulsRuntimeException(CommonCodeConstanst.FAILED,"password is wrong");
        }
        P2PHKSignature p2PHKSignature = SignatureUtil.createSignatureByEckey(transaction, eckey);
        p2PHKSignatures.add(p2PHKSignature);
        transactionSignature.setP2PHKSignatures(p2PHKSignatures);
        transaction.setTransactionSignature(transactionSignature.serialize());
        return transaction;
    }


}
