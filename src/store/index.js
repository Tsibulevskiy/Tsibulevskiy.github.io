import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
/* eslint-disable */
export default new Vuex.Store({
  state: {
    baseUrl: 'https://min-api.cryptocompare.com/data',
    apiKey: 'c7672ea88ee9152b9af099d43dd030eb08a058188eea47ad0ee1375370c39e17',
    coinList: '',
    coin: '',
    labels: [],
    value: [],
    coinPrice: ''
  },
  mutations: {
    coinList (state, payload) {
      state.coinList = payload
    },
    coinLabels (state, payload) {
      state.labels = payload.map(entry => entry.time)
    },
    coinValue (state, payload) {
      state.value = payload.map(entry => entry.high)
    },
    coinInfo (state, payload) {
      state.coin = payload
    },
    coinPrice (state, payload) {
      state.coinPrice = payload
    }
  },
  actions: {
    coin_list ({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios.get(state.baseUrl + '/top/totalvolfull', {
          params: {
            limit: 10,
            tsym: 'USD'
          },
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Apikey ' + state.apiKey
          }
        })
          .then((response) => {
            commit('coinList', response.data)
            resolve(response.data)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    },
    coin ({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(state.baseUrl + '/v2/histoday', {
          params: {
            fsym: payload,
            tsym: 'USD',
            limit: 10
          },
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Apikey ' + state.apiKey
          }
        })
          .then((response) => {
            commit('coinLabels', response.data.Data.Data)
            commit('coinValue', response.data.Data.Data)
            resolve(response.data)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    },
    price ({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(state.baseUrl + '/price', {
          params: {
            fsym: payload,
            tsyms: 'USD,JPY,EUR'
          },
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Apikey ' + state.apiKey
          }
        })
          .then((response) => {
            commit('coinPrice', response.data)
            resolve(response.data)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    },
    coin_info ({ commit }, payload) {
      commit('coinInfo', payload)
    }
  },
  getters: {
    getBaseUrl: (state) => state.baseUrl,
    getCoinList: (state) => state.coinList,
    getCoin: (state) => state.coin,
    getLabels: (state) => state.labels,
    getValue: (state) => state.value,
    getCoinPrice: (state) => state.coinPrice
  }
})
