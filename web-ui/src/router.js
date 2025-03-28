import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: `/`,
      name: 'home',
      component: resolve => require(['@/views/Home.vue'], resolve)
    },
    {
      path: '/blocks',
      name: 'block',
      component: resolve => require(['@/views/block/Block'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/block/info',
      name: 'blockInfo',
      component: resolve => require(['@/views/block/BlockInfo'], resolve)
    },
    {
      path: '/accounts',
      name: 'address',
      component: resolve => require(['@/views/address/Address'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/address/info',
      name: 'addressInfo',
      component: resolve => require(['@/views/address/AddressInfo'], resolve)
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
        keepAlive: true
      }
    },
    {
      path: '/transaction/info',
      name: 'transactionInfo',
      component: resolve => require(['@/views/transaction/TransactionInfo'], resolve)
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
        keepAlive: true
      }
    },
    {
      path: '/consensus/info',
      name: 'ConsensusInfo',
      component: resolve => require(['@/views/consensus/ConsensusInfo'], resolve)
    },
    {
      path: '/rotation/info',
      name: 'rotationInfo',
      component: resolve => require(['@/views/consensus/RotationInfo'], resolve)
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
      ]
    },
    {
      path: '/contracts/info',
      name: 'contractsInfo',
      component: resolve => require(['@/views/contracts/ContractInfo'], resolve)
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
      component: resolve => require(['@/views/contracts/oldTokenInfo'], resolve)
    },
    {
      path: '/parachains',
      name: 'Parachains',
      component: resolve => require(['@/views/network/Network'], resolve)
    },
    {
      path: '/parachains/info',
      name: 'ParachainsInfo',
      component: resolve => require(['@/views/network/NetworkInfo'], resolve)
    },
    {
      path: '/protocol_update',
      name: 'protocolUpdate',
      component: resolve => require(['@/views/protocol_update/Index'], resolve)
    },
    {
      path: '/burned-list',
      name: 'destroyList',
      component: resolve => require(['@/views/destroyList/index'], resolve)
    },
    {
      path: '/assets',
      name: 'Assets',
      component: resolve => require(['@/views/assets/index'], resolve)
    },
    {
      path: '/assets/nrc20',
      name: 'AssetsNrc20',
      component: resolve => require(['@/views/assets/index'], resolve)
    },
    {
      path: '/assets/nrc721',
      name: 'AssetsNrc721',
      component: resolve => require(['@/views/assets/index'], resolve)
    },
    {
      path: '/assets/nrc1155',
      name: 'AssetsNrc1155',
      component: resolve => require(['@/views/assets/index'], resolve)
    },
    {
      path: '/asset/:assetId/:address?',
      name: 'Asset',
      component: resolve => require(['@/views/assets/AssetInfo'], resolve)
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
