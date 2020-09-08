import Vue from 'vue'
import Vuex from 'vuex'
import * as api from './api'
import { menus } from '@/views/MainPage/menus'
import { account, login } from '@/api'
import { TOKEN_KEY } from '@/consts'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    account: null,
    isLogin: !!localStorage.getItem(TOKEN_KEY),
    menus,
    sideMenu: null,
    activePath: null,
  },
  mutations: {
    account(state, account) {
      state.account = account
    },
    login(state) {
      state.isLogin = true
    },
    signout(state) {
      state.account = null
      state.isLogin = false
    },
  },
  actions: {
    async account({ commit }) {
      await account().then(data => {
        commit('account', data)
      })
    },
    signout({ commit }) {
      localStorage.clear()
      commit('signout')
    },
    login({ commit }, params) {
      return login(params).then(token => {
        localStorage.setItem(TOKEN_KEY, token)
        commit('login')
      })
    },
  },
  getters: {
    account: state => state.account,
  },
})
