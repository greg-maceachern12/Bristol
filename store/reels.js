// store/reels.js
import api from '../api'

export const state = () => ({
  reels: [],
  loaded: false
})

export const mutations = {
  store: function (state, {data}) {
    let reelsData;
    try {
      reelsData = data.items.map(item => {
        const fields = item.fields;
        
        // Transform media fields to include full URLs
        if (fields.preview) {
          fields.preview = {
            src: "https:" + fields.preview.fields.file.url,
            alt: fields.preview.fields.description || fields.title
          }
        }

        if (fields.wordmark) {
          fields.wordmark = {
            src: "https:" + fields.wordmark.fields.file.url,
            alt: fields.wordmark.fields.description || "Wordmark"
          }
        }

        // Transform awards into a structured format
        if (fields.awards) {
          fields.processedAwards = {
            categories: Object.keys(fields.awards),
            entries: Object.entries(fields.awards).map(([category, awards]) => ({
              category,
              awards: awards.map(award => award.replace(/^(Title:|Award:)/, '').trim())
            }))
          }
        }

        // Ensure required fields have defaults
        return {
          ...fields,
          title: fields.title || 'Untitled Reel',
          bio: fields.bio || '',
          processedAwards: fields.processedAwards || { categories: [], entries: [] }
        }
      });
    } catch (e) {
      reelsData = [];
    }

    state.reels = reelsData
  },

  toggleLoaded: function (state, val) {
    state.loaded = val
  }
}

export const getters = {
  getReels: function (state) {
    return state.reels
  },
  
  isLoaded: function (state) {
    return state.loaded
  }
}

export const actions = {
  async fetchReels({commit}) {
    commit('toggleLoaded', false)
    let data = await api.getReels()
    commit('store', {data})
    commit('toggleLoaded', true)
  }
}