import api from '../api'

export const state = () => ({
  contact: {},
  loaded: false
})

export const mutations = {
  store: function (state, { data }) {
    let contactFields;
    try {
      contactFields = data.items[0].fields;
    } catch (e) {
      contactFields = {};
    }

    /*if(!contactFields.address) {
      contactFields.address = '';
    }*/
    if(!contactFields.street) {
      contactFields.street = 'Santa Monica';
    }
    if(!contactFields.city) {
      contactFields.city = 'California';
    }
    /*if(!contactFields.email) {
      contactFields.email = '';
    }*/

    state.contact = contactFields
  },

  toggleLoaded: function (state, val) {
    state.loaded = val
  }
}

export const getters = {
  getContactInfo: function (state) {
    return state.contact
  }
}

export const actions = {
  async fetchContactInfo ({commit}, slug) {
    commit('toggleLoaded', false)
    let data = await api.getContactPage()
    commit('store', { data })
    commit('toggleLoaded', true)
  }
}
