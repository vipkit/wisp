import Vue from 'vue'
import Vuex from 'vuex'
import * as api from './api'
import {
  menus
} from '@/views/MainPage/menus'
import {
  fetchAccount,
  login,
  // initMerchant
} from '@/api'
import {
  TOKEN_KEY,
} from '@/consts'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    account: null,
    merchant: {},
    isLogin: !!localStorage.getItem(TOKEN_KEY),
    loadingAccount: true,
    menus,
    sideMenu: null,
    activePath: null
  },
  mutations: {
    account(state, account) {
      state.account = account
      state.loadingAccount = false
    },
    merchant(state, merchant) {
      state.merchant = merchant
    },
    login(state) {
      state.isLogin = true
    },
    signout(state) {
      state.account = null
      state.merchant = null
      state.isLogin = false
    },
    loadingAccount(state) {
      state.loadingAccount = true
    },
  },
  actions: {
    account({
      commit
    }) {
      commit('loadingAccount')
      return commit('account', true)
      // return fetchAccount().then(account => {
      //   commit('account', account)
      // })
    },
    // async merchant({
    //   commit
    // }) {
    //   await initMerchant().then(data => {
    //     commit('merchant', data)
    //   })
    // },
    signout({
      commit
    }) {
      localStorage.clear()
      commit('signout')
    },
    login({
      commit
    }, params) {
      return login(params).then(token => {
        localStorage.setItem(TOKEN_KEY, token)
        commit('login')
      })
    },

  },
  getters: {
    status: (state, getters) => getters.merchant && getters.merchant.status,
    account: state => state.account,
    merchant: state => state.merchant,
    userName: (state, getters) =>
      (getters.merchant && getters.merchant.companyName) ||
      (getters.account && getters.account.mobile),
    brandName: (state, getters) =>
      getters.merchant && getters.merchant.brandName,
    brandImage: (state, getters) =>
      getters.merchant && getters.merchant.brandImage,
  },
})