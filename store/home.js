import api from '../api'

export const state = () => ({
  currentFilm: 0,
  homePage: {},
  loaded: false,
  homeFilms: [],
  animation: 0,
  homePreviews: [],
  animationLottie: null
})

export const mutations = {
  store: function (state, { data }) {
    let homeData = data.items[0].fields
    state.homePage = homeData

    if(homeData.hasOwnProperty('animation')) {
      if(!homeData.animation) {
        state.animation = 3;
      }
    }

    if(homeData.hasOwnProperty('animationLottie')) {
      state.animationLottie = homeData.animationLottie;
    }

    if(homeData.hasOwnProperty('animationLottieFrames')) {
      state.animationLottieFrames = homeData.animationLottieFrames;
    }

    if(state.homeFilms.length === 0) {
      for (var i = 0; i < homeData.featuresList.length; i++) {
        state.homeFilms.push(homeData.featuresList[i])
      }

      for (var i = 0; i < homeData.docsList.length; i++) {
        state.homeFilms.push(homeData.docsList[i])
      }

      for (var i = 0; i < homeData.shortsList.length; i++) {
        state.homeFilms.push(homeData.shortsList[i])
      }
    }

    if (state.homePreviews.length === 0) {
      for (var i = 0; i < homeData.developmentList.length; i++) {
        state.homePreviews.push(homeData.developmentList[i])
      }
    }

    if(state.animation < 2) {
      state.animation++;
    }
  },

  storeCurrentFilm: function (state, { data }) {
    state.currentFilm = data
  },

  toggleLoaded: function (state, val) {
    state.loaded = val
  }
}

export const getters = {
  getCurrentFilm: function (state) {
    return state.currentFilm
  },

  getHomePageData: function (state) {
    return state.homePage
  },

  getHomeFilms: function(state) {
    return state.homeFilms
  },

  getAnimationState: function (state) {
    return state.animation
  },

  getAnimationLottie: function (state) {
    return state.animationLottie
  },

  getAnimationLottieFrames: function (state) {
    return state.animationLottieFrames
  },

  getFeatures: function (state) {
    return state.homeFilms.filter(o => o.fields.category === 'Feature')
  },

  getDocs: function (state) {
    return state.homeFilms.filter(o => o.fields.category === 'Documentary')
  },

  getShorts: function (state) {
    return state.homeFilms.filter(o => o.fields.category === 'Short')
  },

  getHomePreviews: function (state) {
    return state.homePreviews
  }
}

export const actions = {
  async changeCurrentFilm ({commit}, data) {
    commit('storeCurrentFilm', { data })
  },

  async fetchHomeData ({commit}) {
    commit('toggleLoaded', false)
    let data = await api.getHomePage()
    commit('store', { data })
    commit('toggleLoaded', true)
  },
}
