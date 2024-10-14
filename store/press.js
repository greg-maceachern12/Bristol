import api from '../api'

export const state = () => ({
  press: [],
  loaded: false
})

export const mutations = {
  store: function (state, { data }) {
    state.press.push(data)
  },

  toggleLoaded: function (state, val) {
    state.loaded = val
  }
}

export const getters = {
  getFilms: function (state) {
    return state.press
  }
}

export const actions = {
  async fetchPress ({commit}, slug) {
    commit('toggleLoaded', false)
    let data = await api.getAllPress()
    commit('store', { data })
    commit('toggleLoaded', true)
  }
}
