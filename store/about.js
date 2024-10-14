import api from '../api'

export const state = () => ({
  about: {},
  loaded: false
})

export const mutations = {
  store: function (state, {data}) {
    let aboutData;
    try {
      aboutData = data.items[0].fields;
    } catch (e) {
      aboutData = {};
    }

    if (!aboutData.description) {
      aboutData.description = 'Founded in 2014 with the intention of channeling classic moviemaking techniques, particularly the styles of the Golden Age of Cinema, while respecting and utilizing new innovations that enhance the art of cinematic storytelling.';
    }

    if (!aboutData.logo) {
      aboutData.logo = {
        "src": require("../assets/images/logo.svg"),
        "alt": "Bristol Pictures",
      };
    } else {
      aboutData.logo = {
        "src": "https:" + aboutData.logo.fields.file.url,
        "alt": aboutData.logo.fields.description,
      }
    }

    state.about = aboutData
  },

  toggleLoaded: function (state, val) {
    state.loaded = val
  }
}

export const getters = {
  getAboutInfo: function (state) {
    return state.about
  }
}

export const actions = {
  async fetchAboutPage({commit}, slug) {
    commit('toggleLoaded', false)
    let data = await api.getAboutPage()
    commit('store', {data})
    commit('toggleLoaded', true)
  }
}
