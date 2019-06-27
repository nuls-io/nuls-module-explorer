import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //当前高度
    height:0,
    //节点信息
    nodeNumber: [],
    //nuls 信息
    NULSNumber: [],
  },
  mutations: {

    SET_HEIGHT(state, data) {
      state.height = data;
      sessionStorage.setItem('height', data.height);
    },

    SET_NODENUMBER(state, data) {
      state.nodeNumber = data;
    },

    SET_NULSNUMBER(state, data) {
      state.NULSNumber = data;
    },
  },
  getters: {
    height(state) {
      if (!state.height) {
        state.height = parseInt(sessionStorage.getItem('height'))
      }
      return state.height
    },

    nodeNumber(state) {
      return state.nodeNumber
    },

    NULSNumber(state) {
      return state.NULSNumber
    }
  },
  actions: {}
})
