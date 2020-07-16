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
      path: '/block',
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
      path: '/address/info',
      name: 'addressInfo',
      component: resolve => require(['@/views/address/AddressInfo'], resolve)
    },
    {
      path: '/addressInfo',
      name: 'accountInfo',
      component: resolve => require(['@/views/address/AddressInfo'], resolve)
    },
    {
      path: '/address',
      name: 'address',
      component: resolve => require(['@/views/address/Address'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/transaction',
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
    {
      path: '/transactionHash',
      name: 'transactionHash',
      component: resolve => require(['@/views/transaction/TransactionInfo'], resolve)
    },
    {
      path: '/consensus',
      name: 'consensus',
      component: resolve => require(['@/views/consensus/Consensus'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/consensus/info',
      name: 'consensusInfo',
      component: resolve => require(['@/views/consensus/ConsensusInfo'], resolve)
    },
    {
      path: '/rotation/info',
      name: 'rotationInfo',
      component: resolve => require(['@/views/consensus/RotationInfo'], resolve)
    },
    {
      path: '/contracts',
      name: 'contracts',
      component: resolve => require(['@/views/contracts/Contracts'], resolve)
    },
    {
      path: '/contracts/info',
      name: 'contractsInfo',
      component: resolve => require(['@/views/contracts/ContractsInfo'], resolve)
    },
    {
      path: '/token/info',
      name: 'tokenInfo',
      component: resolve => require(['@/views/contracts/TokenInfo'], resolve)
    },
    {
      path: '/network',
      name: 'network',
      component: resolve => require(['@/views/network/Network'], resolve)
    },
    {
      path: '/network/info',
      name: 'networkInfo',
      component: resolve => require(['@/views/network/NetworkInfo'], resolve)
    },
    {
      path: '/protocol_update',
      name: 'protocolUpdate',
      component: resolve => require(['@/views/protocol_update/Index'], resolve)
    },
  ]
})
