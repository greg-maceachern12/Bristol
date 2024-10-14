<template lang="pug">
  .press-item
    p.press-body(:class="{ small: small}")
      | {{ quote }}
    figure(v-if="sourceLogo")
      img(:src="sourceLogo")
    p.presse-source(v-if="!sourceLogo")
      | {{ source }}
</template>

<script>

export default {
  props: ['article', 'size'],
  computed: {
    fields () {
      return this.article.fields
    },

    quote () {
      return this.fields.quote
    },

    source () {
      return this.fields.source
    },

    sourceLogo () {
      return this.fields.sourceLogo ? 'https:' + this.fields.sourceLogo.fields.file.url : false
    },

    small () {
      return this.size === 'xs'
    }
  }
}
</script>

<style lang="sass">
  @import '../assets/styles/_variables.sass'
  .press-item
    padding-bottom: 8rem
    @media only screen and (min-width: $m)
      padding-bottom: 7.4rem
    .press-body
      margin-bottom: 6rem
      text-transform: uppercase
      @media only screen and (min-width: $m)
        margin-bottom: 2.4rem
      &.small
        margin-bottom: 3.8rem
    figure
      height: 3.2rem
      display: flex
      justify-content: center
      img
        height: 100%
        width: auto
</style>

