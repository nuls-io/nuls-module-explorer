import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //Current height
    height: 0,
    //Node information
    nodeNumber: [],
    //nuls information
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
  actions: {},
  plugins: [createPersistedState({
    key: 'NULSNumber',
    storage: window.sessionStorage,
  })]
})
