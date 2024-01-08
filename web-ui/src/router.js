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
      path: '/Blocks',
      name: 'block',
      component: resolve => require(['@/views/block/Block'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Blocks/info',
      name: 'blockInfo',
      component: resolve => require(['@/views/block/BlockInfo'], resolve)
    },
    {
      path: '/Accounts/info',
      name: 'addressInfo',
      component: resolve => require(['@/views/address/AddressInfo'], resolve)
    },
    {
      path: '/AccountsInfo',
      name: 'accountInfo',
      component: resolve => require(['@/views/address/AddressInfo'], resolve)
    },
    {
      path: '/Accounts',
      name: 'address',
      component: resolve => require(['@/views/address/Address'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Transactions',
      name: 'transaction',
      component: resolve => require(['@/views/transaction/Transaction'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Transactions/info',
      name: 'transactionInfo',
      component: resolve => require(['@/views/transaction/TransactionInfo'], resolve)
    },
    {
      path: '/TransactionHash',
      name: 'transactionHash',
      component: resolve => require(['@/views/transaction/TransactionInfo'], resolve)
    },
    {
      path: '/Consensus',
      name: 'Consensus',
      component: resolve => require(['@/views/consensus/Consensus'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Consensus/info',
      name: 'ConsensusInfo',
      component: resolve => require(['@/views/consensus/ConsensusInfo'], resolve)
    },
    {
      path: '/Rotation/info',
      name: 'rotationInfo',
      component: resolve => require(['@/views/consensus/RotationInfo'], resolve)
    },
    {
      path: '/Contracts',
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
      path: '/Contracts/info',
      name: 'contractsInfo',
      component: resolve => require(['@/views/contracts/ContractInfo'], resolve)
    },
    {
      path: '/Token/info',
      name: 'tokenInfo',
      component: resolve => require(['@/views/contracts/TokenInfo'], resolve)
    },
    {
      path: '/OldToken/info',
      name: 'oldTokenInfo',
      component: resolve => require(['@/views/contracts/oldTokenInfo'], resolve)
    },
    {
      path: '/Parachains',
      name: 'Parachains',
      component: resolve => require(['@/views/network/Network'], resolve)
    },
    {
      path: '/Parachains/info',
      name: 'ParachainsInfo',
      component: resolve => require(['@/views/network/NetworkInfo'], resolve)
    },
    {
      path: '/Protocol_update',
      name: 'protocolUpdate',
      component: resolve => require(['@/views/protocol_update/Index'], resolve)
    },
    {
      path: '/Destroy/list',
      name: 'destroyList',
      component: resolve => require(['@/views/destroyList/index'], resolve)
    },
    {
      path: '/Assets',
      name: 'Assets',
      component: resolve => require(['@/views/assets/index'], resolve)
    },
    {
      path: '/Assets/nrc20',
      name: 'AssetsNrc20',
      component: resolve => require(['@/views/assets/index'], resolve)
    },
    {
      path: '/Assets/nrc721',
      name: 'AssetsNrc721',
      component: resolve => require(['@/views/assets/index'], resolve)
    },
    {
      path: '/Assets/nrc1155',
      name: 'AssetsNrc1155',
      component: resolve => require(['@/views/assets/index'], resolve)
    },
    {
      path: '/Assets/details/:assetId',
      name: 'Assetsdetails',
      component: resolve => require(['@/views/assets/assetsdetails'], resolve)
    },
    {
      path: '/Assets/holderAddress/:assetId',
      name: 'holderAddress',
      component: resolve => require(['@/views/assets/holderAddress'], resolve)
    },
  ]
})
