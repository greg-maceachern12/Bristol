import api from "../api";

export const state = () => ({
  white: true,
  mobileNavActive: false,
  mobile: false,
  routeError: true,
  scrollPos: 0,
  general: {},
  loaded: false
})

export const mutations = {
  store: function (state, {data}) {
    let generalData;
    try {
      generalData = data.items[0].fields;
    } catch (e) {
      generalData = {};
    }

    if (generalData.favicon) {
      generalData.faviconSrc = "https:" + generalData.favicon.fields.file.url;
    } else {
      generalData.faviconSrc = require("../assets/images/favicon.png") ;
    }

    if (!generalData.navigationLogo) {
      generalData.navigationLogo = {
        "src": require("../assets/images/nav_logo.png"),
        "alt": "Bristol Pictures",
      };
    } else {
      generalData.navigationLogo = {
        "src": "https:" + generalData.navigationLogo.fields.file.url,
        "alt": generalData.navigationLogo.fields.description,
      }
    }

    if (!generalData.footerLogo) {
      generalData.footerLogo = {
        "src": require("../assets/images/logo.svg"),
        "alt": "Bristol Pictures",
      };
    } else {
      generalData.footerLogo = {
        "src": "https:" + generalData.footerLogo.fields.file.url,
        "alt": generalData.footerLogo.fields.description,
      }
    }

    state.general = generalData
  },

  storeContext: function (state, { data }) {
    state.white = data
  },

  storeScrollPos: function (state, { data }) {
    state.scrollPos = data
  },

  toggleMobileNav: function (state) {
    state.mobileNavActive = !state.mobileNavActive
  },

  toggleMobile: function (state, { data }) {
    state.mobile = data
  },

  toggleRouteError: function (state, { data }) {
    state.routeError = data
  },

  toggleLoaded: function (state, val) {
    state.loaded = val
  }
}

export const getters = {
  getWhite: function (state) {
    return state.white
  },

  getMobileNavActive: function (state) {
    return state.mobileNavActive
  },

  getMobile: function (state) {
    return state.mobile
  },

  getRouteError: function (state) {
    return state.routeError
  },

  getScrollPos: function (state) {
    return state.scrollPos
  },

  getNavLogoSrc: function (state) {
    return state.general.navigationLogo ? state.general.navigationLogo.src : '';
  },

  getNavLogoAlt: function (state) {
    return state.general.navigationLogo ? state.general.navigationLogo.alt : '';
  },

  getFooterLogoSrc: function (state) {
    return state.general.footerLogo ? state.general.footerLogo.src : '';
  },

  getFooterLogoAlt: function (state) {
    return state.general.footerLogo ? state.general.footerLogo.alt : '';
  },

  getFaviconSrc: function (state) {
    return state.general.faviconSrc ? state.general.faviconSrc : '';
  }
}

export const actions = {
  whiteNav ({commit}, data) {
    commit('storeContext', { data })
  },

  saveScrollPos ({commit}, data) {
    commit('storeScrollPos', { data })
  },

  changeMobileNavState ({commit}) {
    commit('toggleMobileNav')
  },

  changeMobileState ({commit}, data) {
    commit('toggleMobile', { data })
  },

  changeRouteErrorState ({commit}, data) {
    commit('toggleRouteError', { data })
  },

  async fetchGeneralSettings({commit}, slug) {
    commit('toggleLoaded', false)
    let data = await api.getGeneralSettings();
    commit('store', {data})
    commit('toggleLoaded', true)
  }
}
