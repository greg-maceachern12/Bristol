<template lang="pug">
  .app
    navigation
    .app-content
      nuxt
    foot
</template>

<script>
import Navigation from '../components/Navigation.vue'
import Foot from '../components/Foot.vue'

export default {
  components: {
    Navigation,
    Foot
  }
}
</script>

<style lang="sass">
  @import '../assets/styles/_variables.sass'
  .app
    overflow: hidden
    .app-content
      padding-top: 6.4rem
      @media only screen and (min-width: $m)
        padding-top: 0
</style>

