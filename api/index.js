const contentful = require("contentful")

const config = {
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN,
  environment: process.env.CTF_ENVIRONMENT
}

// export `createClient` to use it in page components
const client = contentful.createClient(config)

export default {
  getHomePage () {
    return client.getEntries({
      'content_type': 'homepage'
    })
  },

  getProjectByTitle (title) {
    return client.getEntries({
      'content_type': 'film, preview',
      'fields.title': title
    })
  },

  getAllFilms () {
    return client.getEntries({
      'content_type': 'film'
    })
  },

  getAllPreviews () {
    return client.getEntries({
      'content_type': 'preview'
    })
  },

  getAboutPage() {
    return client.getEntries({
      'content_type': 'about'
    })
  },

  getContactPage() {
    return client.getEntries({
      'content_type': 'contact'
    })
  },

  getGeneralSettings() {
    return client.getEntries({
      'content_type': 'general'
    })
  },

  getAllPress() {
    return client.getEntries({
      'content_type': 'press'
    })
  }
}
