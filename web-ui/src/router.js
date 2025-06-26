import Vue from 'vue'
import Router from 'vue-router'
import VueMeta from 'vue-meta'

Vue.use(Router);
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
});

export default new Router({
  mode: 'history',
  routes: [
    {
      path: `/`,
      name: 'home',
      component: resolve => require(['@/views/Home.vue'], resolve),
      meta: {
        metaInfo: {
          title: 'NULS AI Explorer',
          description: 'NULS AI Explorer is a blockchain explorer for NULS AI, providing real-time data and insights into the NULS AI network.'
        }
      }
    },
    {
      path: '/blocks',
      name: 'block',
      component: resolve => require(['@/views/block/Block'], resolve),
      meta: {
        keepAlive: true,
        metaInfo: {
          title: 'NULS AI Blocks',
          description: 'Blocks that are included in the NULS AI blockchain. The timestamp, block producer, block reward, difficulty and included transaction are shown.'
        }
      }
    },
    {
      path: '/block/info',
      name: 'blockInfo',
      component: resolve => require(['@/views/block/BlockInfo'], resolve),
      meta: {
        metaInfo: {
          title: 'NULS AI Blocks',
          description: 'NULS AI Block Height. The timestamp, block reward, difficulty, gas used and the number of transactions in the block are detailed on Nulscan.'
        }
      }
    },
    {
      path: '/accounts',
      name: 'address',
      component: resolve => require(['@/views/address/Address'], resolve),
      meta: {
        keepAlive: true,
        metaInfo: {
          title: 'NULS AI Top Accounts by NAI Balance',
          description: 'The top accounts in NULS AI in descending order by the number of NAI balance in an account and the percentage of the NAI that the account hold.'
        }
      }
    },
    {
      path: '/address/info',
      name: 'addressInfo',
      component: resolve => require(['@/views/address/AddressInfo'], resolve),
      meta: {
        metaInfo: {
          title: 'NULS AI Address Detail',
          description: 'The Address Detail page allows users to view the transactions, balances.'
        }
      }
    },
    /* {
      path: '/AccountsInfo',
      name: 'accountInfo',
      component: resolve => require(['@/views/address/AddressInfo'], resolve)
    }, */
    {
      path: '/transactions',
      name: 'transaction',
      component: resolve => require(['@/views/transaction/Transaction'], resolve),
      meta: {
        keepAlive: true,
        metaInfo: {
          title: 'NULS AI Transactions Information',
          description: 'Transactions that have been mined and confirmed on the NULS AI Blockchain. The list consists of transactions from sending NAI and the transactions for interacting with a smart contract.'
        }
      }
    },
    {
      path: '/transaction/info',
      name: 'transactionInfo',
      component: resolve => require(['@/views/transaction/TransactionInfo'], resolve),
      meta: {
        metaInfo: {
          title: 'NULS AI Transaction Hash (Txhash) Details',
          description: 'NULS AI detailed transaction info for txhash. The transaction status, block confirmation, gas fee, NAI, and token transfer are shown.'
        }
      }
    },
    /* {
      path: '/TransactionHash',
      name: 'transactionHash',
      component: resolve => require(['@/views/transaction/TransactionInfo'], resolve)
    }, */
    {
      path: '/consensus',
      name: 'Consensus',
      component: resolve => require(['@/views/consensus/Consensus'], resolve),
      meta: {
        keepAlive: true,
        metaInfo: {
          title: 'NULS Consensus',
          description: "Explore NULS' innovative DPoS consensus: real-time node data, staking rewards, and block statistics on NULScan."
        }
      }
    },
    {
      path: '/consensus/info',
      name: 'ConsensusInfo',
      component: resolve => require(['@/views/consensus/ConsensusInfo'], resolve),
      meta: {
        metaInfo: {
          title: 'NULS AI Consensus Node Information',
          description: 'The Consensus Node Information page provides detailed information about the consensus nodes, including their status, block production, and staking rewards.'
        }
      }
    },
    {
      path: '/rotation/info',
      name: 'rotationInfo',
      component: resolve => require(['@/views/consensus/RotationInfo'], resolve),
      meta: {
        metaInfo: {
          title: 'NULS AI Rotation Information',
          description: 'The Rotation Information page provides detailed information about the rotation of consensus nodes, including their rotation status and block production.'
        }
      }
    },
    {
      path: '/contracts',
      name: 'contractsBase',
      component: resolve => require(['@/views/contracts/ContractsBase'], resolve),
      children: [
        { path: '', name: 'contracts', component: resolve => require(['@/views/contracts/Contracts'], resolve) },
        { path: 'nrc20', name: 'nrc20', component: resolve => require(['@/views/contracts/Nrc20'], resolve) },
        { path: 'nrc721', name: 'nrc721', component: resolve => require(['@/views/contracts/Nrc721'], resolve) },
        { path: 'nrc1155', name: 'nrc1155', component: resolve => require(['@/views/contracts/Nrc1155'], resolve) }
      ],
      meta: {
        metaInfo: {
          title: 'NULS AI Contracts',
          description: 'Contract Address of the NULS AI Blockchain. Verified contracts have the source code compiled and verified to be matching the deployed bytecode of the contract on the blockchain.'
        }
      }
    },
    {
      path: '/contracts/info',
      name: 'contractsInfo',
      component: resolve => require(['@/views/contracts/ContractInfo'], resolve),
      meta: {
        metaInfo: {
          title: 'NULS AI Contracts',
          metaInfo: 'The Contract Address page allows users to view the source code, transactions, balances, and analytics for the contract address. Users can also interact and make transactions to the contract directly.'
        }
      }
    },
    // ???
    // {
    //   path: '/token/info',
    //   name: 'tokenInfo',
    //   component: resolve => require(['@/views/contracts/TokenInfo'], resolve)
    // },
    {
      path: '/token/info',
      name: 'tokenInfo',
      component: resolve => require(['@/views/contracts/oldTokenInfo'], resolve),
      meta: {
        metaInfo: {
          title: 'NULS AI Token Information',
          description: 'The Token Information page provides detailed information about the token, including its name, symbol, total supply, and holders.'
        }
      }
    },
    {
      path: '/parachains',
      name: 'Parachains',
      component: resolve => require(['@/views/network/Network'], resolve),
      meta: {
        metaInfo: {
          title: 'NULS AI Parachains',
          description: 'Explore NULS AI Parachains: real-time data, network stats, and detailed information on parachain performance and activity.'
        }
      }
    },
    {
      path: '/parachains/info',
      name: 'ParachainsInfo',
      component: resolve => require(['@/views/network/NetworkInfo'], resolve)
    },
    {
      path: '/protocol_update',
      name: 'protocolUpdate',
      component: resolve => require(['@/views/protocol_update/Index'], resolve),
      meta: {
        metaInfo: {
          title: 'NULS AI Protocol Update',
          description: 'The Protocol Update page provides information about the latest protocol updates, including the version, changes, and improvements.'
        }
      }
    },
    {
      path: '/burned-list',
      name: 'destroyList',
      component: resolve => require(['@/views/destroyList/index'], resolve),
      meta: {
        metaInfo: {
          title: 'NULS AI Burned List',
          description: 'The Burned List page provides information about the burned tokens, including the address, amount, and percentage.'
        }
      }
    },
    {
      path: '/assets',
      name: 'Assets',
      component: resolve => require(['@/views/assets/index'], resolve),
      meta: {
        metaInfo: {
          title: 'NULS AI Assets',
          description: 'The Assets page provides information about the assets on the NULS AI blockchain, including the asset ID, name, symbol, holders, and total supply.'
        }
      }
    },
    {
      path: '/assets/nrc20',
      name: 'AssetsNrc20',
      component: resolve => require(['@/views/assets/index'], resolve),
      meta: {
        metaInfo: {
          title: 'NULS AI NRC20 Assets',
          description: 'The NRC20 Assets page provides information about the NRC20 assets on the NULS AI blockchain, including the asset ID, name, symbol, holders, and total supply.'
        }
      }
    },
    {
      path: '/assets/nrc721',
      name: 'AssetsNrc721',
      component: resolve => require(['@/views/assets/index'], resolve),
      meta: {
        metaInfo: {
          title: 'NULS AI NRC721 Assets',
          description: 'The NRC721 Assets page provides information about the NRC721 assets on the NULS AI blockchain, including the asset ID, name, symbol, holders, and total supply.'
        }
      }
    },
    {
      path: '/assets/nrc1155',
      name: 'AssetsNrc1155',
      component: resolve => require(['@/views/assets/index'], resolve),
      meta: {
        metaInfo: {
          title: 'NULS AI NRC1155 Assets',
          description: 'The NRC1155 Assets page provides information about the NRC1155 assets on the NULS AI blockchain, including the asset ID, name, symbol, and total supply.'
        }
      }
    },
    {
      path: '/asset/:assetId/:address?',
      name: 'Asset',
      component: resolve => require(['@/views/assets/AssetInfo'], resolve),
      meta: {
        metaInfo: {
          title: 'NULS AI Asset Information',
          description: 'The Asset Information page provides detailed information about the asset, including its name, symbol, total supply, holders and latest transactions.'
        }
      }
    },
    /* {
      path: '/asset/details/:assetId',
      name: 'Assetsdetails',
      component: resolve => require(['@/views/assets/assetsdetails'], resolve)
    },
    {
      path: '/assets/holderAddress/:assetId',
      name: 'holderAddress',
      component: resolve => require(['@/views/assets/holderAddress'], resolve)
    }, */
  ]
})
