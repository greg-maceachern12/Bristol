<template lang="pug">
  main.about
    .content
      figure
        img(:src="aboutLogoSrc" :alt="aboutLogoAlt")
      p.about-body
        | {{ info.description }}
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getAboutInfo: 'about/getAboutInfo'
    }),

    info () {
      return this.getAboutInfo
    },

    aboutLogoSrc() {
      return this.getAboutInfo.logo.src
    },

    aboutLogoAlt() {
      return this.getAboutInfo.logo.alt
    }
  },

  methods: {
    ...mapActions({
      whiteNav: 'navigation/whiteNav'
    })
  },

  mounted () {
    this.whiteNav(false)
  },

  fetch({store, params}) {
    return Promise.all([
      store.dispatch("about/fetchAboutPage"),
    ]);
  }
}
</script>

<style lang="sass">
  @import '../../assets/styles/_variables.sass'
  .about
    height: calc(100vh - 6.4rem)
    background-color: $leather
    display: flex
    justify-content: center
    align-items: center
    @media only screen and (min-width: $m)
      height: 100vh
    .content
      width: 78.8rem
      padding: 0 2rem 0 2rem
      @media only screen and (min-width: $m)
        padding: 0
      figure
        width: 13rem
        margin: 0 auto 6.5rem auto
        @media only screen and (min-width: $m)
          width: 18rem
        img
          width: 100%
</style>
