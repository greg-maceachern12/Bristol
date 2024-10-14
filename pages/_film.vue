<template lang="pug">
  main
    film(:currentFilm="currentFilmExists" v-if="type === 'film'")
    preview(:currentFilm="currentFilmExists" v-if="type === 'preview'")
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Film from '../components/Film.vue'
import Preview from '../components/Preview.vue'

export default {
  components: {
    Film,
    Preview
  },

  head () {
    return {
      title: `${this.title}`,
      meta: [{
        hid: `description`,
        name: 'description',
        content: `${this.description}`
      },
      {
        hid: `og-title`,
        property: 'og:title',
        content: `${this.title}`
      },
      {
        hid: `og-description`,
        property: 'og:description',
        content: `${this.description}`
      },
      {
        hid: `og-image`,
        property: 'og:image',
        content: `${this.image}`
      },
      {
        hid: `og-url`,
        property: 'og:url',
        content: `https://bristolpictures.com/${this.$route.path}`
      },
      {
        hid: `twitter-card`,
        property: 'twitter:card',
        content: `summary_large_image`
      },
      {
        hid: `twitter-description`,
        property: 'twitter:description',
        content: `${this.description}`
      },
      {
        hid: `twitter-title`,
        property: 'twitter:title',
        content: `${this.title}`
      },
      {
        hid: `twitter-image`,
        property: 'twitter:image',
        content: `${this.image}`
      }]
    }
  },

  computed: {
    ...mapGetters({
      getFilmBySlug: 'films/getFilmBySlug',
      getPreviewBySlug: 'previews/getPreviewBySlug'
    }),

    currentFilm () {
      return this.getFilmBySlug(this.slug) ? this.getFilmBySlug(this.slug) : this.getPreviewBySlug(this.slug)
    },

    currentFilmExists () {
      this.changeRouteErrorState(true)
      if (this.currentFilm) {
        this.changeRouteErrorState(false)
        return this.currentFilm
      } else {
        this.$nuxt.error({ statusCode: 404, message: 'Page not Found' })
        this.changeRouteErrorState(true)
        return false
      }
    },

    description () {
      if (this.currentFilmExists) {
        return this.currentFilm.fields.description
      }
    },

    title () {
      if (this.currentFilmExists) {
        return this.currentFilm.fields.title
      } else {
        return ''
      }
    },

    image () {
      if (this.currentFilmExists) {
        return 'https:' + this.currentFilm.fields.mobilePreviewImage.fields.file.url
      } else {
        return ''
      }
    },

    type () {
      if (this.currentFilmExists) {
        return this.currentFilm.sys.contentType.sys.id
      } else {
        return ''
      }
    },

    slug () {
      return this.$route.params.film
    }
  },

  methods: {
    ...mapActions({
      whiteNav: 'navigation/whiteNav',
      changeRouteErrorState: 'navigation/changeRouteErrorState'
    })
  },

  mounted () {
    this.whiteNav(true)
  },

  fetch ({ store, params }) {
    return Promise.all(
      [
        store.dispatch('films/fetchFilms'),
        store.dispatch('previews/fetchPreviews')
      ]
    )
  }
}
</script>
