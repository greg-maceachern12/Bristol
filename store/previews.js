import api from '../api'

export const state = () => ({
  previews: [],
  loaded: false,
  authenticated: false
})

export const mutations = {
  store: function (state, { data }) {
    if (state.previews.length === 0) {
      for (var o of data.items) {
        state.previews.push(o)
      }
    }
  },

  toggleLoaded: function (state, val) {
    state.loaded = val
  },

  authenticate: function (state, val) {
    state.authenticated = val
  }
}

export const getters = {
  getPreviews: function (state) {
    return state.previews
  },

  getPreviewBySlug: (state) => (title) => {
    return state.previews.filter( (o) => {
      const slug = o.fields.title.toLowerCase().split(' ').join('-')
      return slug === title
    })[0]
  },

  getAuthenticated: function (state) {
    return state.authenticated
  }
}

export const actions = {
  async fetchPreviews ({commit}, slug) {
    commit('toggleLoaded', false)
    let data = await api.getAllPreviews()
    commit('store', { data })
    commit('toggleLoaded', true)
  }
}
