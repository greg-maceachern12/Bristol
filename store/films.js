import api from '../api'

export const state = () => ({
  films: [],
  loaded: false
})

export const mutations = {
  store: function (state, { data }) {
    if (state.films.length === 0) {
      for (var o of data.items) {
        state.films.push(o)
      }
    }
  },

  toggleLoaded: function (state, val) {
    state.loaded = val
  }
}

export const getters = {
  getFilms: function (state) {
    return state.films
  },

  getFilmBySlug: (state) => (title) => {
    return state.films.filter( (o) => {
      const slug = o.fields.title.toLowerCase().split(' ').join('-')
      return slug === title
    })[0]
  },

  getFeatures: function (state) {
    return state.films.filter(o => o.fields.category === 'Feature')
  },

  getDocs: function (state) {
    return state.films.filter(o => o.fields.category === 'Documentary')
  },

  getShorts: function (state) {
    return state.films.filter(o => o.fields.category === 'Short')
  }
}

export const actions = {
  async fetchFilms ({commit}) {
    commit('toggleLoaded', false)
    let data = await api.getAllFilms()
    commit('store', { data })
    commit('toggleLoaded', true)
  },

  async fetchFilmByTitle ({commit}, title) {
    commit('toggleLoaded', false)
    let data = await api.getProjectByTitle(title)
    commit('store', { data })
    commit('toggleLoaded', true)
  }
}
