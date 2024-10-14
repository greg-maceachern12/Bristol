<template lang="pug">
  footer(v-if="!hideFooter && !getRouteError")
    figure
      img(:src="logoSrc" :alt="logoAlt" v-if="logoSrc")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getRouteError: 'navigation/getRouteError',
      logoSrc: 'navigation/getFooterLogoSrc',
      logoAlt: 'navigation/getFooterLogoAlt'
    }),

    hideFooter () {
      return true;
      return this.$route.path === '/about' || this.$route.path === '/contact'
    }
  }
}
</script>

<style lang="sass">
  @import '../assets/styles/_variables.sass'
  footer
    width: 100vw
    height: 33.6vh
    background-color: $geyser
    display: flex
    justify-content: center
    align-items: center
    @media only screen and (min-width: $m)
      height: 22rem
    figure
      width: 18.6rem
      @media only screen and (min-width: $m)
        width: 31.1rem
      img
        width: 100%
</style>

