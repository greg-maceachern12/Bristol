<template lang="pug">
  .home-card
    h2
      | {{ section }}
    .wordmarks
      nuxt-link(:to="{ name: 'film', params: { film: slug(film) }}" v-for="film in films" :key="film.id")
        figure.mobile-preview-image(v-if="mobile" :style="previewImage(film)")
          figure.mobile-wordmark
            img(:src="'https:' + wordmarkLink(film)")
        figure.wordmark(
          @mouseenter="handleTeaser(allFilms.indexOf(film), 'films')"
          @mouseleave="handleTeaserLeave"
          v-if="!mobile"
        )
          img(:src="'https:' + wordmarkLink(film)")
</template>

<script>

export default {
  props: ['section', 'films']
}
</script>

<style lang="sass">
  @import '../assets/styles/_variables.sass'
  .home-card
    h2
      text-align: center
      margin: 23rem 0 7rem 0
      &:first-of-type
        margin: 0 0 7rem 0
    .wordmarks
      position: relative
      .mobile-preview-image
        width: 100vw
        height: 25rem
        .mobile-wordmark
          width: 21.9rem
          position: absolute
          top: 50%
          left: 50%
          transform: translate(-50%, -50%)
      .wordmark
        @media only screen and (min-width: $m)
          margin-bottom: 20.2rem
          position: static
        img
          width: 100%
          height: 100%
</style>
